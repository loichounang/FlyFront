import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Card, Descriptions, Avatar, Button, Tabs, Row, Col, Typography, Progress } from "antd";
import { UserOutlined, SettingOutlined, HistoryOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { BookOutlined, PieChartOutlined } from "@mui/icons-material";
import { BASE_URL, COURS_API, USERS_API } from "../../services/ApiServices";

const { TabPane } = Tabs;
const { Title } = Typography;

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [followedCourses, setFollowedCourses] = useState([]);
  const [progressionLessonDetails, setProgressionLessonDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch user data, followed courses, and progression lessons in parallel
        const userResponsePromise = axios.get(`${BASE_URL}/${USERS_API}/user`, config);
        const followedCoursesResponsePromise = axios.get(`${BASE_URL}/${COURS_API}/cours-utilisateur`, config);
        const progressionLessonsResponsePromise = axios.get(`${BASE_URL}/${COURS_API}/progression-leçon`, config);

        const [userResponse, followedCoursesResponse, progressionLessonsResponse] = await Promise.all([
          userResponsePromise,
          followedCoursesResponsePromise,
          progressionLessonsResponsePromise
        ]);

        const userData = userResponse.data;
        setUserData(userData);

        // Store initial followed courses data
        const followedCoursesData = followedCoursesResponse.data;
        const courseIds = followedCoursesData.map(item => item.cours);

        // Fetch detailed course info
        const coursesDetailsPromises = courseIds.map(id =>
          axios.get(`${BASE_URL}/${COURS_API}/cours/${id}`, config)
        );
        const coursesDetailsResponses = await Promise.all(coursesDetailsPromises);

        // Create a map of course details for easy lookup
        const coursesDetailsMap = {};
        coursesDetailsResponses.forEach(res => {
          coursesDetailsMap[res.data.id] = res.data;
        });

        // Enrich followed courses with details
        const enrichedFollowedCourses = followedCoursesData.map(course => ({
          ...course,
          details: coursesDetailsMap[course.cours]
        }));
        setFollowedCourses(enrichedFollowedCourses);

        // Store progression lesson details with course details
        const enrichedProgressionLessonDetails = progressionLessonsResponse.data.map(detail => ({
          ...detail,
          cours_titre: coursesDetailsMap[detail.cours]?.titre || 'Titre non disponible'
        }));
        setProgressionLessonDetails(enrichedProgressionLessonDetails);

      } catch (error) {
        setError("Erreur lors de la récupération des données utilisateur");
        enqueueSnackbar("Erreur lors de la récupération des données utilisateur", { variant: "error" });
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [enqueueSnackbar, navigate]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <Card style={{ marginBottom: "20px", textAlign: "center" }}>
        <Avatar
          size={120}
          icon={<UserOutlined />}
          style={{ marginBottom: "20px" }}
        />
        <h2>{userData.nom_complet}</h2>
        <p>{userData.email}</p>
        <Button type="primary" icon={<SettingOutlined />}>
          Modifier Profil
        </Button>
      </Card>

      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Informations personnelles" key="1" icon={<UserOutlined />}>
            <Descriptions layout="vertical" bordered>
              <Descriptions.Item label="Nom complet">{userData.nom_complet}</Descriptions.Item>
              <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
              <Descriptions.Item label="Date d'inscription">{userData.date_inscription}</Descriptions.Item>
              <Descriptions.Item label="Statut">{userData.statut}</Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab="Activité récente" key="2" icon={<HistoryOutlined />}>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={followedCourses}
              renderItem={course => (
                <List.Item
                  key={course.id}
                  extra={
                    <Progress
                      percent={course.progress}
                      format={percent => `${percent}%`}
                      strokeColor="#1890ff"
                    />
                  }
                >
                  <List.Item.Meta
                    title={<Title level={4}>{course.details?.titre || 'Titre non disponible'}</Title>}
                    description={
                      <>
                        <Typography type="secondary">Date de début:</Typography> {new Date(course.date_début).toLocaleDateString()}
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>

          <TabPane tab="Progression des leçons" key="3" icon={<HistoryOutlined />}>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={progressionLessonDetails}
              renderItem={detail => (
                <List.Item
                  key={detail.id}
                  extra={
                    <Progress
                      percent={detail.progress}
                      format={percent => `${percent}%`}
                      strokeColor="#1890ff"
                    />
                  }
                >
                  <List.Item.Meta
                    title={<Title level={4}>{detail.lecon_titre}</Title>}
                    description={
                      <>
                        <Typography type="secondary">Cours:</Typography> {detail.cours_titre}
                        <br />
                        <Typography type="secondary">Date de début:</Typography> {new Date(detail.date_début).toLocaleDateString()}
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>

          <TabPane tab="Statistiques Globales" key="4" icon={<PieChartOutlined />}>
            {/* Statistiques globales */}
          </TabPane>

          <TabPane tab="Recommandations Personnalisées" key="5" icon={<BookOutlined />}>
            {/* Recommandations personnalisées */}
          </TabPane>

          <TabPane tab="Historique des Activités" key="6" icon={<HistoryOutlined />}>
            {/* Historique des activités */}
          </TabPane>

          <TabPane tab="Paramètres du compte" key="7" icon={<SettingOutlined />}>
            <Row gutter={16}>
              <Col span={12}>
                <Button type="danger" block>
                  Changer le mot de passe
                </Button>
              </Col>
              <Col span={12}>
                <Button type="default" block>
                  Supprimer mon compte
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default UserProfile;
