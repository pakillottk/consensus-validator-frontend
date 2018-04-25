import Auth from './authorization';

//Any logged user
export const Any = Auth( '*' );
//Only superadmin
export const Super = Auth([ 'superadmin' ]);
export const Admin = Auth([ 'superadmin', 'admin' ]);
export const Supervisor = Auth([ 'superadmin', 'admin', 'supervisor' ]);
export const TOManager = Auth([ 'superadmin', 'admin', 'supervisor', 'ticketoffice-manager' ]);
export const Seller = Auth([ 'superadmin', 'admin', 'supervisor', 'ticketoffice-manager', 'seller' ]);