import { Calculator } from "../models/Calculator.js";
import { Record } from "../models/Record.js";
import { createRecord } from "./recordFactory.js";

export const onStart = () => {
    const recordType = document.querySelector('#type');
    const form = document.querySelector('#form');
    const incomes = document.querySelector('#incomes');
    const expenses = document.querySelector('#expenses');
    const total = document.querySelector('#total');
    const sumInput = document.querySelector('#sum-input');
    const titleInput = document.querySelector('#title-input');
    const dateInput = document.querySelector('#date-input');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const type = recordType.value;
        const sum = parseFloat(type === 'income' ? sumInput.value : -sumInput.value);
        const title = titleInput.value;
        const date = dateInput.value;
        const record = createRecord(title, sum, type, date);

        const li = document.createElement('li');

        const div = document.createElement('div');
        div.classList.add('container-li');

        const info = document.createElement('span');
        info.textContent = record.getInfo();

        const xBtn = document.createElement('span');
        xBtn.textContent = 'X';
        xBtn.className = 'x-btn';

        record.type === 'income' ? incomes.appendChild(li) : expenses.appendChild(li);
        total.textContent = `${Calculator.balance(Record.recordsList)}`;

        xBtn.addEventListener('click', () => {
            record.removeRecord();
            record.type === 'income' ? incomes.removeChild(li) : expenses.removeChild(li);
            total.textContent = `${Calculator.balance(Record.recordsList)}`;
        });

        div.appendChild(info);
        div.appendChild(xBtn);

        li.appendChild(div);
    });
}
