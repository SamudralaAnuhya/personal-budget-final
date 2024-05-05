import React, { useState } from 'react';

const ExpenseItem = ({ expense, onRemove, onUpdate }) => {
    const [description, setDescription] = useState(expense.description);
    const [amount, setAmount] = useState(expense.amount);

    const handleRemove = () => {
        onRemove(expense.id);
    };

    const handleUpdate = () => {
        onUpdate(expense.id, description, amount);
    };

    return (
        <li>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
            <button onClick={handleRemove}>Remove</button>
            <button onClick={handleUpdate}>Save</button>
        </li>
    );
};

export default ExpenseItem;