import { UserProfilePage, Dashboard, UsersAdminPage, CoursAdminPage, CoursDetailsAdminPage, HomePage, ForumPage, CoursesPage, CategoriesPage } from "../pages";
import CategoryDetail from "../components/admin/details/CategoryDetails";
import NotFound from "../components/common/NotFound";

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
        path: '/admin/courses/:courseId/details',
        component: () => <CoursDetailsAdminPage isAdmin={true} />,
        layout: 'admin',
    },

    {
        path: '/mes-cours/:courseId/details',
        component: () => <CoursDetailsAdminPage isAdmin={false} />,
        layout: 'web',
    },
    {
        path: '/mes-catégories/:categoryId/details',
        component: CategoryDetail,
        layout: 'web',
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
        path: '/profil/dashboard',
        component: UserProfilePage,
        layout: 'web',
    },
    {
        path: '/forum',
        component: ForumPage,
        layout: 'web',
    },
    {
        path: '*',
        component: NotFound,
        layout: 'web',
    },
    {
        path: '/admin/*',
        component: NotFound,
        layout: 'admin',
    },
];

export default routes;
