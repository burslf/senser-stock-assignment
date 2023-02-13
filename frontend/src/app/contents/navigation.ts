export interface Menu {
    name: string;
    url: string;
    icon: string;
    active: boolean;
}

export const navigation: Menu[] = [
    {
        name: 'Home',
        url: '/',
        icon: 'apps',
        active: false
    },
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'show_chart',
        active: false
    },
    {
        name: 'Profile',
        url: '/profile',
        icon: 'account_circle',
        active: false
    }
]