import React, { useState, useEffect } from 'react';
import service from '../service/RolesService';
import List from "./List";
import Form from "./Form";
import Details from "./Details";
import "../styles/table.css";

const Roles = ({jwtToken}) => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [editingRole, setEditingRole] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const modelName = "Role";

    useEffect(() => {
        fetchRoles(jwtToken);
    }, []);

    const fetchRoles = async (jwtToken) => {
        try {
            const rolesData = await service.getRoles(jwtToken);
            setRoles(rolesData);
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleEdit = (id) => {
        console.log('Edit button clicked for role roleId:', id);
        console.log("All roles" + JSON.stringify(roles));
        const selected = roles.find((role) => role.id === id);
        console.log('Selected role:', selected);
        setSelectedRole(null);
        
        setEditingRole({ id: selected.id, name: selected.name});
    };

    const handleDelete = async (id) => {
        try {
            console.log("Role ID" + id);
            await service.deleteRole(id, jwtToken)
            fetchRoles(jwtToken);
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const handleViewDetails = (id) => {
        const selected = roles.find((role) => role.id === id);
        setSelectedRole(selected);
        setEditingRole(null);
    };

    const handleCreate = () => {
        setSelectedRole(null);
        setEditingRole({ name: '' });
        setIsFormOpen(true);
    };

    const handleCancelEdit = () => {
        setEditingRole(null);
        setIsFormOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Editing Role:', editingRole);

            if (editingRole) {
                if (editingRole.id) {
                    console.log("updating role " + editingRole)
                    await service.updateRole(editingRole, jwtToken);

                } else {
                    const name = editingRole.name;
                    await service.createRole(name, jwtToken)
                }
                fetchRoles();
            }
        } catch (error) {
            console.error('Error saving role:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingRole(null);
            setIsFormOpen(false);
        }
    };

    return (
        <div>
            <List model={roles} modelName={modelName} handleEdit={handleEdit} handleDelete={handleDelete} />
            {selectedRole && <Details model={selectedRole} modelName={modelName} />}
            {editingRole && (
                <Form
                    fields={[
                        {name:"roleId", label:"Role ID", value:editingRole.id, type:"text", disabled:true},
                        {name:"name", label:"Role Name", value:editingRole.name, type:"text", disabled:false},
                    ]}
                    model={editingRole}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingRole({ ...editingRole, [e.target.name]: e.target.value })}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
        </div>
    );
};

export default Roles;