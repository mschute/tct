import React, { useState, useEffect } from 'react';
import service from '../service/RolesService';
import List from "./List";
import Form from "./Form";
import Details from "./Details";
import "../styles/table.css";

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [editingRole, setEditingRole] = useState(null);
    const modelName = "Role";

    useEffect(() => {
        // Fetch roles data when component mounts
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const rolesData = await service.getRoles();
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

        // Ensure that the property names match the expected format
        setEditingRole({ id: selected.id, name: selected.name});
    };

    const handleDelete = async (id) => {
        try {
            console.log("Role ID" + id);
            await service.deleteRole(id)
            fetchRoles();
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
    };

    const handleCancelEdit = () => {
        setEditingRole(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Editing Role:', editingRole);

            if (editingRole) {
                if (editingRole.id) {
                    console.log("updating role " + editingRole)
                    await service.updateRole(editingRole);

                } else {
                    const name = editingRole.name;
                    await service.createRole(name)
                }
                fetchRoles();
            }
        } catch (error) {
            console.error('Error saving role:', error);
            console.error('Response data:', error.response?.data);
        } finally {
            setEditingRole(null);
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
            <button className="primary-button" onClick={handleCreate}>Add new</button>
        </div>
    );
};

export default Roles;