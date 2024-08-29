import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Checkbox, Pagination } from 'antd';

const { Option } = Select;

const UserManagement = ({dataColumns}) => {
  const [users, setUsers] = useState([]); // Liste initiale des utilisateurs
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Nombre d'éléments par page

  useEffect(() => {
    // Charger la liste des utilisateurs depuis l'API ou le state global
    // Par exemple : setUsers(data);
  }, []);

  useEffect(() => {
    // Filtrage initial lors du chargement des utilisateurs
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (term) => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Réinitialiser à la première page après la recherche
  };

  const handleRoleFilter = (role) => {
    const filtered = users.filter(user => user.role === role);
    setFilteredUsers(filtered);
    setCurrentPage(1); // Réinitialiser à la première page après le filtrage
  };

  const handleStatusFilter = (e) => {
    const isActive = e.target.checked;
    const filtered = users.filter(user => user.status === (isActive ? 'active' : 'inactive'));
    setFilteredUsers(filtered);
    setCurrentPage(1); // Réinitialiser à la première page après le filtrage
  };

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const currentData = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <Input.Search
        placeholder="Rechercher un utilisateur"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <div style={{ marginBottom: 20 }}>
        <Select placeholder="Filtrer par rôle" onChange={handleRoleFilter} style={{ width: 200, marginRight: 10 }}>
          <Option value="admin">Administrateur</Option>
          <Option value="user">Ambassadeur</Option>
          <Option value="user">Team Leader</Option>
          <Option value="user">Membre</Option>
        </Select>
        <Checkbox onChange={handleStatusFilter} style={{color: "var(--content-title-text-color)"}}>Afficher uniquement les utilisateurs actifs</Checkbox>
      </div>
      <Table columns={dataColumns} dataSource={currentData} rowKey="id" pagination={false} />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredUsers.length}
        onChange={handleChangePage}
        showSizeChanger
        onShowSizeChange={handleChangePage}
        style={{ marginTop: 20, textAlign: 'right' }}
      />
    </div>
  );
};

export default UserManagement;
