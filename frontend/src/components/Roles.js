import React, { useState, useEffect } from 'react';
import service from '../service/RolesService';
import List from "./List";
import Form from "./Form";
import Details from "./Details";

//TODO NONE OF THE ROLES ARE WORKING
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

    const handleEdit = (roleId) => {
        console.log('Edit button clicked for role roleId:', roleId);
        const selected = roles.find((role) => role.roleId === roleId);
        console.log('Selected role:', selected);
        setSelectedRole(null);

        // Ensure that the property names match the expected format
        setEditingRole({ roleId: selected.roleId, newRoleName: selected.newRoleName});
    };

    const handleDelete = async (roleId) => {
        try {
            await service.deleteRole(roleId)
            fetchRoles();
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const handleViewDetails = (roleId) => {
        const selected = roles.find((role) => role.roleId === roleId);
        setSelectedRole(selected);
        setEditingRole(null);
    };

    const handleCreate = () => {
        setSelectedRole(null);
        setEditingRole({ newRoleName: '' });
    };

    const handleCancelEdit = () => {
        setEditingRole(null);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('Editing Role:', editingRole);

            if (editingRole) {
                if (editingRole.roleId) {
                    console.log('Updating existing role:', editingRole);
                    await service.updateRole(editingRole.roleId, editingRole);

                } else {
                    // Remove the existing roleId property for new roles
                    const { roleId, ...newRole } = editingRole;
                    console.log('Creating new role:', newRole);
                    await service.createRole(newRole)
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
                        {name:"roleId", label:"Role ID", value:editingRole.roleId, type:"text", disabled:true},
                        {name:"newRoleName", label:"Role Name", value:editingRole.newRoleName, type:"text", disabled:false},
                    ]}
                    model={editingRole}
                    modelName={modelName}
                    handleInputChange={(e) => setEditingRole({ ...editingRole, [e.target.name]: e.target.value })}
                    handleSubmit={handleFormSubmit}
                    handleCancel={handleCancelEdit}
                />
            )}
            <button onClick={handleCreate}>Add new</button>
        </div>
    );
};

export default Roles;