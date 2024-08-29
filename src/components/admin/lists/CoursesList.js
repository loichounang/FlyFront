import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Checkbox, Pagination } from 'antd';

const { Option } = Select;

const CoursesManagement = ({dataColumns}) => {
  const [courses, setCourses] = useState([]); // Liste initiale des utilisateurs
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Nombre d'éléments par page
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Charger la liste des utilisateurs depuis l'API ou le state global
    // Par exemple : setUsers(data);
  }, []);

  useEffect(() => {
    // Filtrage initial lors du chargement des utilisateurs
    setFilteredCourses(courses);
  }, [courses]);

  useEffect(() => {
    //Récupération de la liste des catégories
    setCategories(categories)
  }, [categories]);

  const handleSearch = (term) => {
    const filtered = courses.filter(user =>
      user.name.toLowerCase().includes(term.toLowerCase()) ||
      user.email.toLowerCase().includes(term.toLowerCase())
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
                <option key={index} value={element.id}>
                    {element.name}
                </option>
            )
          })}
        </Select>
        <Checkbox onChange={handleStatusFilter} style={{color: "var(--content-title-text-color)"}}>Afficher uniquement les cours commencés</Checkbox>
      </div>
      <Table columns={dataColumns} dataSource={currentData} rowKey="id" pagination={false} />
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
