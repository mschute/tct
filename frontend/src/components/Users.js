import React, {useState, useEffect} from 'react';
import service from '../service/UserService';
import roleService from "../service/RolesService";
import List from "./List";
import "../styles/table.css";
import UserForm from "./UserForm";

const Users = ({jwtToken}) => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [roles, setRoles] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const modelName = "User";

    useEffect(() => {
        fetchUsers(jwtToken);
        fetchRoles(jwtToken);
    }, []);

    const clearErrorMessage = () => {
        setErrorMessage('');
    }
    
    const fetchUsers = async () => {
        try {
            const usersData = await service.getUsers(jwtToken);
            setUsers(usersData);
            clearErrorMessage();
        } catch (error) {
            console.error(error.message)
        }
    }

    const fetchRoles = async () => {
        try {
            const rolesData = await roleService.getRoles(jwtToken);
            setRoles(rolesData);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleEdit = (userId) => {
        const selected = users.find((user) => user.userId === userId);
        setEditingUser(null);

        setEditingUser({userId: selected.userId, email: selected.email, roleName: selected.roleName});
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    const handleRoleAssign = async (event) => {
        event.preventDefault();
        try {
            clearErrorMessage();
            
            await roleService.updateUserRole({userId: editingUser.userId, roleName: editingUser.roleName});
            await fetchUsers(jwtToken);
        } catch (error) {
            setErrorMessage('Error assigning role. Please try again.');
            console.error('Response data: ', error.response?.data);
        }
    };

    return (
        <div>
            <List model={users} modelName={modelName} handleEdit={handleEdit}/>
            {editingUser && (
                <UserForm
                    fields={[
                        {name: "userId", label: "User ID", value: editingUser.userId, type: "text", disabled: true},
                        {name: "email", label: "Email", value: editingUser.email, type: "text", disabled: true},
                        {
                            name: "roleName",
                            label: "Role Name",
                            value: editingUser.roleName,
                            type: "select",
                            disabled: false,
                            options: roles
                        },
                    ]}
                    modelName={modelName}
                    handleInputChange={(event) => {
                        const {name, value} = event.target;
                        setEditingUser({...editingUser, [name]: value});
                    }}
                    handleRoleAssign={handleRoleAssign}
                    handleCancelEdit={handleCancelEdit}
                />
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default Users;