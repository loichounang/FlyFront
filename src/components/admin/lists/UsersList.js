import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Checkbox, Pagination } from 'antd';
import axios from 'axios';
//import APIBaseURL from '../../../services/ApiServices';
import { useSnackbar } from 'notistack';
//import { Spinner } from 'react-bootstrap';

const { Option } = Select;

const UserManagement = ({dataColumns}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [users, setUsers] = useState([]); // Liste initiale des utilisateurs
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Nombre d'éléments par page
  const [loading, setLoading] = useState(false);

  const handleSearch = (term) => {
    const filtered = users.filter(user =>
      user.nom.toLowerCase().includes(term.toLowerCase()) ||
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

  useEffect(() => {
    // Charger la liste des utilisateurs depuis l'API ou le state global
    const fillTable = async() => {
      setLoading(true);
      const token = localStorage.getItem("token"); // Récupérer le token de connexion de l'utilisateur connecté pour pouvoir l'authentifier sur toutes ses prochaines requêtes
        // Configuration des en-têtes avec le token
        const config = {
          headers: {
            Authorization: `Token ${token}`, // Assurez-vous que le backend attend un token de ce type
          },
        };

      try {
        const usersResponse = await axios.get("http://127.0.0.1:8000/api/utilisateurs/utilisateurs", config);
        if(usersResponse.status >= 200 && usersResponse.status <=300) {
          setUsers(usersResponse.data);
          setFilteredUsers(usersResponse.data);
        } else {
          enqueueSnackbar(usersResponse.data.detail, {
            variant: "error",
            autoHideDuration: 3000,
          })
        }
      } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.data;
        switch (status) {
          case 500:
            enqueueSnackbar("Une erreur serveur s'est produite.", {
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
              ContentProps: {
                style: {
                  backgroundColor: '#ffa445', // Change le fond de cette notification seulement
                  color: '#fff',               // Couleur du texte
                  fontSize: '16px',            // Ajuste la taille du texte
                  borderRadius: '8px',         // Coins arrondis
                },
              },
              variant: 'error',
              autoHideDuration: 5000,
            });
            break;
          case 403:
            enqueueSnackbar(detail,{
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
              ContentProps: {
                style: {
                  backgroundColor: '#ffa445', // Change le fond de cette notification seulement
                  color: '#fff',               // Couleur du texte
                  fontSize: '16px',            // Ajuste la taille du texte
                  borderRadius: '8px',         // Coins arrondis
                },
              },
              variant: 'error',
              autoHideDuration: 5000,
            });
            break;
          case 404:
            enqueueSnackbar(detail,{
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
              ContentProps: {
                style: {
                  backgroundColor: '#ffa445', // Change le fond de cette notification seulement
                  color: '#fff',               // Couleur du texte
                  fontSize: '16px',            // Ajuste la taille du texte
                  borderRadius: '8px',         // Coins arrondis
                },
              },
              variant: 'error',
              autoHideDuration: 5000,
            });
            break;
        
          default:
            break;
        }
      } finally{
        setLoading(false);
      }
    };
    fillTable();
  }, [enqueueSnackbar]);

  return (
    <div>
      <Input.Search
        placeholder="Rechercher un utilisateur"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <div style={{ marginBottom: 20 }}>
        <Select placeholder="Filtrer par rôle" onChange={handleRoleFilter} style={{ width: 200, marginRight: 10 }}>
          <Option value="administrateur">Administrateur</Option>
          <Option value="ambassadeur">Ambassadeur</Option>
          <Option value="team_leader">Team Leader</Option>
          <Option value="utilisateur">Membre</Option>
        </Select>
        <Checkbox onChange={handleStatusFilter} style={{color: "var(--content-title-text-color)"}}>Afficher uniquement les utilisateurs actifs</Checkbox>
      </div>
      <Table columns={dataColumns} dataSource={currentData} rowKey="id" pagination={true} loading={loading} rowSelection={true}/>
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
