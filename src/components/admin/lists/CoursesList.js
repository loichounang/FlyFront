import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Checkbox, Pagination } from 'antd';
import axios from 'axios';
import { useSnackbar } from 'notistack';


const CoursesManagement = ({dataColumns}) => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]); // Liste filtrée des cours
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Nombre d'éléments par page
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setLoading(true);
    // Charger la liste des cours depuis l'API ou le state global
    const fetchCourses = async() => {
      const token = localStorage.getItem("token"); // Récupérer le token parmi les informations de connexion

      const config = {
        headers : {
          Authorization: `Token ${token}`, // Assurez-vous que le backend attend un token de ce type
        },
      };

      try {
        const coursesResponse = await axios.get("http://127.0.0.1:8000/api/cours/cours", {}, config);
        setCourses(coursesResponse.data);
      } catch (error) {
        const status = error.response?.status;
        const data = error.response?.data;
        switch (status) {
          case 500:
            enqueueSnackbar(data.detail ? data.detail : "Une erreur interne est survenue de notre côté", {
              variant: "error",
              autoHideDuration: 3000
            });
            break;
          case 404:
            enqueueSnackbar(data.detail ? data.detail : "Le chemin spécifié est introuvable" , {
              variant: "error",
              autoHideDuration: 3000
            });
            break;
          case 403:
            enqueueSnackbar(data.detail ? data.detail : "Vous ne disposez pas de l'accès à cette ressource" , {
              variant: "warning",
              autoHideDuration: 3000
            });
            break;
          case 301:
            enqueueSnackbar(data.detail ? data.detail : "Ces données ont été permanemment déplacées" , {
              variant: "info",
              autoHideDuration: 3000
            });
            break;
        
          default:
            break;
        }
      } finally{
        setLoading(false);
      }
    };

    fetchCourses();
  }, [enqueueSnackbar]);

  useEffect(() => {
    // Filtrage initial lors du chargement des utilisateurs
    setFilteredCourses(courses);
  }, [courses]);

  useEffect(() => {
    //Récupération de la liste des catégories
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cours/categories");
        setCategories(response.data);
      } catch (error) {
        const status = error.response?.status;
        const data = error.response?.data;
        switch (status) {
          case 500:
            enqueueSnackbar(data.detail ? data.detail : "Une erreur interne est survenue de notre côté", {
              variant: "error",
              autoHideDuration: 3000
            });
            break;
          case 404:
            enqueueSnackbar(data.detail ? data.detail : "Le chemin spécifié est introuvable" , {
              variant: "error",
              autoHideDuration: 3000
            });
            break;
          case 403:
            enqueueSnackbar(data.detail ? data.detail : "Vous ne disposez pas de l'accès à cette ressource" , {
              variant: "warning",
              autoHideDuration: 3000
            });
            break;
          case 301:
            enqueueSnackbar(data.detail ? data.detail : "Ces données ont été permanemment déplacées" , {
              variant: "info",
              autoHideDuration: 3000
            });
            break;
        
          default:
            break;
        }
      }
    };

    fetchCategories();
  }, [enqueueSnackbar]);

  const handleSearch = (term) => {
    const filtered = courses.filter(courses =>
      courses.titre.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1); // Réinitialiser à la première page après la recherche
  };

  const handleCategoryFilter = (category) => {
    const filtered = courses.filter(course => course.category === category);
    setFilteredCourses(filtered);
    setCurrentPage(1); // Réinitialiser à la première page après le filtrage
  };

  const handleStatusFilter = (e) => {
    const isActive = e.target.checked;
    const filtered = courses.filter(course => course.status === (isActive ? 'active' : 'inactive'));
    setFilteredCourses(filtered);
    setCurrentPage(1); // Réinitialiser à la première page après le filtrage
  };

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const currentData = filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Configuration du rowSelection pour permettre une seule sélection
  const rowSelection = {
    type: 'radio', // Permet de sélectionner une seule ligne à la fois
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys); // Met à jour les clés sélectionnées
      if (selectedRows.length > 0) {
        setSelectedId(selectedRows[0].id); // Récupère l'ID de l'élément sélectionné
        // Effectuer des actions avec l'ID sélectionné ici
        console.log('ID sélectionné:', selectedRows[0].id);
      }
    },
  };

  return (
    <div>
      <Input.Search
        placeholder="Rechercher un cours"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <div style={{ marginBottom: 20 }}>
        <Select placeholder="Filtrer par catégories" onChange={handleCategoryFilter} style={{ width: 200, marginRight: 10 }}>
          {categories.map((element, index) => {
            return (
              <Select.Option key={index} value={element.id}>
                {element.libellé}
              </Select.Option>
            
            )
          })}
        </Select>
        <Checkbox onChange={handleStatusFilter} style={{color: "var(--content-title-text-color)"}}>Afficher uniquement les cours commencés</Checkbox>
      </div>
      <Table columns={dataColumns} dataSource={currentData} rowKey="id" pagination={true} loading={loading} rowSelection={rowSelection} />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredCourses.length}
        onChange={handleChangePage}
        showSizeChanger
        onShowSizeChange={handleChangePage}
        style={{ marginTop: 20, textAlign: 'right' }}
      />
    </div>
  );
};

export default CoursesManagement;
