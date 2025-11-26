export const dataEmpresa = {
    template: {
        backgroundColor: '#1044A3',
        color: '#fff',
    },
    basics: {
        name: 'Soluciones para Eventos - Carpas y Más',
        description: `Alquileres, de alta calidad y atención personalizada.`,
        label: 'Eventos y Alquileres',
        logoPdf: 'https://res.cloudinary.com/dpyrrgou3/image/upload/v1763594643/720023d64ef755_xukwwv.png',
        logoWeb: 'https://res.cloudinary.com/dpyrrgou3/image/upload/v1763676559/ac6bb0f48be7f6_ltjrgr.png',
    },
    location: {
        address: 'Ciudad de el Alto',
        postalCode: null,
        city: 'La Paz',
        countryCode: 'BO',
        region: 'Bolivia',
    },
    redes: [
        {
            network: 'Facebook',
            url: 'https://www.facebook.com/774327219108632',
            name: 'Soluciones para eventos',
        },
        {
            network: 'TikTok',
            url: '@soluciones.para.eventos',
            name: 'Soluciones para eventos',
        },
        {
            network: 'WhatsApp',
            url: '+59176259553',
            name: 'Soluciones para eventos',
        },
    ],
    contact: {
        email: 'alquiler.eventos.bo@gmail.com',
        phone: '+59176259553',
        url: 'solucion-eventos.vercel.app',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122403.41295297755!2d-68.12407749999998!3d-16.52071235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915edf0a04f5a40f%3A0x57dbfc76b4458ab3!2sLa%20Paz!5e0!3m2!1ses-419!2sbo!4v1763662666030!5m2!1ses-419!2sbo',
    },
};

export type DataEmpresa = typeof dataEmpresa;
