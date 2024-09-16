import React from "react";
import { Helmet } from "react-helmet-async";
import "./Dashboard.css";
import BootstrapCard from "../../../components/admin/cards/BootstrapCard";
import { CallToAction, Folder, NotificationsActive, People } from "@mui/icons-material";
import { AppBarChart, RechartsLineChart, RechartsPieChart } from "../../../components/admin/charts";
import NotificationList from "../../../components/admin/notifs/NotificationsList";
import AlertSummary from "../../../components/admin/alerts/AlertsSummary";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Helmet>
                <title>
                    Fly Academy: Learn everything with ease / Administrator Dashboard
                </title>
            </Helmet>

            <div className="main">
                <h5 style={{color: "var(--content-title-text-color)", textAlign: "left", padding: "0.5em", marginBottom: "1em", fontSize: "1.5em"}}>
                    Vue d'ensemble
                </h5>

                <section className="first-section">
                    {/** Première section -> première ligne */}
                    <div className="row first-line">
                        <div className="col sm-12 md-3 lg-3 xl-3">
                            <BootstrapCard
                                contentURL="api/utilisateurs/utilisateurs"
                                title = "Utilisateurs"
                                icon={<People />}
                                styles={{
                                    background: "linear-gradient(135deg, #3498db  45%, #4DA898 85%)", /* Exemple pour une carte Utilisateurs */
                                }}
                            />
                        </div>

                        <div className="col sm-12 md-3 lg-3 xl-3">
                            <BootstrapCard
                                contentURL="api/cours/cours/tous-les-cours-commences"
                                title = "Cours Actifs"
                                icon={<Folder />}
                                styles={{
                                    background: "linear-gradient(135deg, #2ecc71  45%, #2ecc88 85%)",
                                }}
                            />
                        </div>

                        <div className="col sm-12 md-3 lg-3 xl-3">
                            <BootstrapCard
                                contentURL="api/messagerie/message/non-lus"
                                title = "Messages Non lus"
                                icon={<NotificationsActive />}
                                styles={{
                                    background: "linear-gradient(135deg, #e74c3c  45%, #e74c58 85%)", /* Exemple pour une carte Utilisateurs */
                                }}
                            />
                        </div>

                        <div className="col sm-12 md-3 lg-3 xl-3">
                            <BootstrapCard 
                                contentURL="api/progressions/interactions"
                                title = "Interactions"
                                icon={<CallToAction />}
                                styles={{
                                    background: "linear-gradient(135deg, #f1c40f  45%, #f1c480 75%)", /* Exemple pour une carte Utilisateurs */
                                }}
                            />
                        </div>
                    </div>

                    {/** Première section -> Deuxième ligne */}
                    <div className="row second-line">
                        <div className="charts-section">
                            <div className="row">
                                <div className="col-8">
                                    {/*<AppLineChart 
                                        chartName="Progession des Utilisateurs"
                                        contentURL="statistics/data"
                                    />*/}
                                    <AppBarChart 
                                        chartName="Intéraction / Messages"
                                    />
                                    
                                </div>

                                <div className="col-4">
                                    <RechartsPieChart
                                        contentURL="api/cours/categories/list-all"
                                        chartName="Répartition des cours"
                                    />
                                </div>
                            </div>

                            <div className="row" style={{marginTop: "5rem"}}>
                                <div className="col">
                                    <RechartsLineChart 
                                        chartName="Progession des Utilisateurs"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="second-section" style={{marginTop: "3rem"}}>
                    <h5 style={{color: "var(--content-title-text-color)", textAlign: "left", padding: "0.5em", marginBottom: "1em", fontSize: "1.5em"}}>
                        Alertes et Notifications
                    </h5>
                    {/** Deuxième section -> première ligne */}
                    <div className="row first-line">
                        <div className="col-4">
                            <AlertSummary />
                        </div>
                        <div className="col-8">
                            <NotificationList />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;