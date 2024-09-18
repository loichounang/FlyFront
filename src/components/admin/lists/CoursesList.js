import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Checkbox, Pagination, Space } from 'antd';
import { useSnackbar } from 'notistack';
import { ListAllCours } from '../../../services/CoursServices/CoursServices';
import { ListAllCategories } from '../../../services/CategoriesServices/CategoriesServices';
import { Button } from "@mui/material";
import { Book, Category, PeopleAlt, Info, Delete, Edit, Refresh } from '@mui/icons-material';
import { CreateCategories, CreateChapters } from '../forms';
import { useNavigate } from 'react-router-dom';

const ShowNotification = ({ text, type, duration }) => {
  const { enqueueSnackbar } = useSnackbar();
  return enqueueSnackbar(text, {
    variant: type,
    autoHideDuration: duration,
  });
};

const CoursesManagement = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modals, setModals] = useState({ participants: false, chapters: false, category: false });

  function toggleModal(type) {
    setModals(prev => ({ ...prev, [type]: !prev[type] }));
  }

  const columns = [
    {title: "ID", dataIndex: "id", key: "id"},
    {title: "Titre", dataIndex: "titre", key: "titre"},
    {title: "Auteur", dataIndex: "auteur", key: "auteur"},
    {title: "Durée (heures)", dataIndex: "durée", key: "durée"},
    {title: "Catégorie", dataIndex: "category", key: "category"},
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <>
                {/* Bouton pour rediriger vers les détails */}
                <Button disabled={!selectedId} onClick={() => handleViewDetails(record.id)}>
                    <Info style={{ color: "slateblue" }} />
                </Button>
                <Button disabled={!selectedId} onClick={() => {/* Fonction de suppression */}}><Delete style={{color: "crimson"}}/></Button>
                <Button disabled={!selectedId} onClick={() => {/* Fonction de suppression */}}><Edit style={{color: "darkgreen"}}/></Button>
            </>
        ),
    },
]

  const handleViewDetails = (id) => {
    // Naviguer vers la page des détails avec l'ID du cours
    navigate(`/admin/courses/${id}/details`);
};

const handleRefresh = async () => {
  setLoading(true);
  try {
    const courses = await ListAllCours();

    // Validation basique des données
    if (Array.isArray(courses)) {
      setCourses(courses);
    } else {
      throw new Error("Les données reçues ne sont pas au format attendu.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des cours:", error);
    ShowNotification("Erreur lors de la récupération des cours", "error", 3000);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    setLoading(true);
    const fetchCourses = async () => {
      try {
        const response = await ListAllCours();
        console.log('Courses Response:', response);
        if (Array.isArray(response)) {
          setCourses(response);
        } else {
          console.error("Les données reçues ne sont pas un tableau:", response);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cours:", error);
        ShowNotification("Erreur lors de la récupération des cours", "error", 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ListAllCategories();
        console.log(response);
        setCategories(Array.isArray(response) ? response : []);
      } catch (error) {
        let status = error.response?.status;
        let detail = error.response?.detail;
        switch (status) {
          case 500:
            ShowNotification(detail ? detail : "Erreur interne du serveur", "error", 3000);
            break;
          case 401:
            ShowNotification(detail ? detail : "Erreur d'autorisations", "error", 3000);
            break;
          case 403:
            ShowNotification(detail ? detail : "Forbiden", "warning", 3000);
            break;
          case 404:
            ShowNotification(detail ? detail : "Introuvable", "info", 3000);
            break;
          default:
            ShowNotification(detail ? detail : "Une erreur inattendue s'est produite", "error", 3000);
            break;
        }
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (term) => {
    const filtered = courses.filter(course =>
      course.titre.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category) => {
    const filtered = courses.filter(course => course.category === category);
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    const isActive = e.target.checked;
    const filtered = courses.filter(course => course.status === (isActive ? 'active' : 'inactive'));
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const handleChangePage = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const currentData = Array.isArray(filteredCourses) 
    ? filteredCourses.slice((currentPage - 1) * pageSize, currentPage * pageSize) 
    : [];


  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      // Limite la sélection à un maximum de deux éléments
      if (selectedRowKeys.length > 1) {
        // Conserver uniquement les deux premiers éléments sélectionnés
        selectedRowKeys = selectedRowKeys.slice(0, 1);
        // Mettre à jour la sélection des lignes
        selectedRows = selectedRows.slice(0, 1);
      }
  
      setSelectedRowKeys(selectedRowKeys);
  
      if (selectedRows.length > 0) {
        // Si plus d'un élément est sélectionné, utilisez les IDs des éléments sélectionnés
        const ids = selectedRows.map(row => row.id);
        setSelectedId(ids);
        console.log('IDs sélectionnés:', ids);
      } else {
        // Si aucun élément n'est sélectionné, réinitialisez les IDs
        setSelectedId(null);
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
        <Select placeholder="Filtrer par catégories" onChange={handleCategoryFilter} style={{ width: 200, marginRight: 10, float: "right"}}>
          {categories.map((element, index) => (
            <Select.Option key={index} value={element.id}>
              {element.name}
            </Select.Option>
          ))}
        </Select>
        <Checkbox onChange={handleStatusFilter} style={{color: "var(--content-title-text-color)"}}>Afficher uniquement les cours commencés</Checkbox>
      </div>
      <Space style={{ marginBottom: 20, float: "left"}}>
        <Button 
          onClick={() => toggleModal('chapters')} 
          disabled={!selectedId}
        >
          Chapitres <Book />
        </Button>
        <Button 
          onClick={() => toggleModal('participants')} 
          disabled={!selectedId}
        >
          Participants <PeopleAlt />
        </Button>

        <Button 
          onClick={() => handleRefresh()} 
        >
            <Refresh />
        </Button>
        
      </Space>
      <Space style={{ float: "right"}}>
        <Button 
          onClick={() => toggleModal('category')} 
        >
          Créer une catégorie <Category />
        </Button>
      </Space>
      <Table columns={columns} dataSource={currentData} rowKey="id" pagination={false} loading={loading} rowSelection={rowSelection} />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredCourses.length}
        onChange={handleChangePage}
        showSizeChanger
        onShowSizeChange={handleChangePage}
        style={{ marginTop: 20, textAlign: 'right' }}
      />
      {/*<CreateChapters visible={modals.chapter} onCancel={() => toggleModal('chapter')}/>*/}
      <CreateChapters visible={modals.chapters} onCancel={() => toggleModal('chapters')} courseID={selectedId} />
      <CreateCategories visible={modals.category} onCancel={() => toggleModal('category')} />
    </div>
  );
};

export default CoursesManagement;
