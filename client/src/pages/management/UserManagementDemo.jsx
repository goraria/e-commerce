import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagementDemo = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users') // Giả sử API trả về danh sách user
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleRoleChange = (id, newRole) => {
        axios.put(`/api/users/${id}`, { role: newRole })
            .then(response => {
                setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h5>Quản lý người dùng</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Role</th>
                        <th>Thay đổi Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>
                                <select value={user.role} onChange={e => handleRoleChange(user.id, e.target.value)}>
                                    <option value="0">Guest</option>
                                    <option value="1">Admin</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementDemo;
