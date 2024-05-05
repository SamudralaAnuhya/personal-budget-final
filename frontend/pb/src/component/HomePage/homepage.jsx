import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ExpenseItem from './ExpenseItem';

const Homepage = () => {
    const [expenses, setExpenses] = useState([]);
    const [newDescription, setNewDescription] = useState('');
    const [newAmount, setNewAmount] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const access_token = localStorage.getItem('access_token');
            const token_type = localStorage.getItem('token_type');

            if (!access_token || !token_type) {
                navigate('/login');
                return;
            }

            const response = await axios.get('http://localhost:8080/api/v1/expenses', {
                headers: {
                    Authorization: `${token_type} ${access_token}`,
                },
            });

            if (response.status === 200) {
                setExpenses(response.data);
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
            navigate('/login');
        }
    };

    const handleRemoveExpense = async (expenseId) => {
        try {
            const access_token = localStorage.getItem('access_token');
            const token_type = localStorage.getItem('token_type');

            await axios.delete(`http://localhost:8080/api/v1/expenses/${expenseId}`, {
                headers: {
                    Authorization: `${token_type} ${access_token}`,
                },
            });

            setExpenses(expenses.filter((expense) => expense.id !== expenseId));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdateExpense = async (expenseId, description, amount) => {
        try {
            const access_token = localStorage.getItem('access_token');
            const token_type = localStorage.getItem('token_type');

            await axios.put(
                `http://localhost:8080/api/v1/expenses/${expenseId}`,
                {
                    description,
                    amount,
                },
                {
                    headers: {
                        Authorization: `${token_type} ${access_token}`,
                    },
                }
            );

            setExpenses(
                expenses.map((expense) =>
                    expense.id === expenseId ? { ...expense, description, amount } : expense
                )
            );
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();

        try {
            const access_token = localStorage.getItem('access_token');
            const token_type = localStorage.getItem('token_type');

            const response = await axios.post(
                'http://localhost:8080/api/v1/expenses',
                {
                    description: newDescription,
                    amount: parseFloat(newAmount),
                },
                {
                    headers: {
                        Authorization: `${token_type} ${access_token}`,
                    },
                }
            );

            if (response.status === 201) {
                setExpenses([...expenses, response.data]);
                setNewDescription('');
                setNewAmount('');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Header />
            <main>
                <h2>Expenses</h2>
                <form onSubmit={handleAddExpense}>
                    <input
                        type="text"
                        placeholder="Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                    />
                    <button type="submit">Add Expense</button>
                </form>
                <ul>
                    {expenses.map((expense) => (
                        <ExpenseItem
                            key={expense.id}
                            expense={expense}
                            onRemove={handleRemoveExpense}
                            onUpdate={handleUpdateExpense}
                        />
                    ))}
                </ul>
            </main>
            <Footer />
        </div>
    );
};

export default Homepage;