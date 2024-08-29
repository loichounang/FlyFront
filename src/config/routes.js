import { HomePage, ForumPage, CoursesPage, CategoriesPage } from "../pages";
import { Dashboard, UsersAdminPage, CoursAdminPage } from "../pages";

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
    }
];

export default routes;
