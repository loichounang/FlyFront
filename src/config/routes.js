import { HomePage, ForumPage, CoursesPage, CategoriesPage, CoursesDetailsPage } from "../pages";
import { Dashboard, UsersAdminPage, CoursAdminPage, CoursDetailsAdminPage } from "../pages";

const routes = [
    {
        path: '/admin/dashboard',
        component: Dashboard,
        layout: 'admin',
    },
    {
        path: '/admin/users',
        component: UsersAdminPage,
        layout: 'admin',
    },
    {
        path: '/admin/courses',
        component: CoursAdminPage,
        layout: 'admin',
    },
    {
        path: `/admin/courses/:courseId/details`,
        component: CoursDetailsAdminPage,
        layout: 'admin',
    },
    
    {
        path: '/',
        component: HomePage,
        layout: 'web',
    },
    {
        path: '/mes-cours',
        component: CoursesPage,
        layout: 'web',
    },
    {
        path: '/mes-catégories',
        component: CategoriesPage,
        layout: 'web',
    },
    {
        path: '/forum',
        component: ForumPage,
        layout: 'web',
    },
    {
        path: `/mes-cours/:courseId/details`,
        component: CoursesDetailsPage,
        layout: 'web',
    },
];

export default routes;
