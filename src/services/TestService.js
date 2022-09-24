const tests=[
    {name:'drive_test',
    display_name:"Test Psicométrico: Control de Coches Doble",
        id:1,
        image:'drive_test.jpg',
        short:'El objetivo de este test es evaluar  la coordinación de sus manos   tanto izquierda y derecha al mismo tiempo.',
        description:'El objetivo de este test es evaluar  la coordinación de sus manos   tanto izquierda y derecha al mismo tiempo   por lo cual debe de mantener los coches dentro de  carril correspondiente por un laptop de 45 segundos, para aprobar.'
    },{name:'puntitos_test',
    display_name:"Test Psicométrico: Toca los circulos",
        id:2,
        image:'puntitos_test.jpg',
        short:'El objetivo de este test es evaluar  la coordinación de sus manos   tanto izquierda y derecha al mismo tiempo.',
        description:'El objetivo de este test es evaluar  la coordinación de sus manos   tanto izquierda y derecha al mismo tiempo   por lo cual debe de mantener los coches dentro de  carril correspondiente por un laptop de 45 segundos, para aprobar.'
    },{name:'test_2',
    display_name:"Test Psicométrico: Toca los circulos",
        id:3,
        image:'puntitos_test.jpg',
        short:'El objetivo de este test es evaluar  la coordinación de sus manos   tanto izquierda y derecha al mismo tiempo.',
        description:'El objetivo de este test es evaluar  la coordinación de sus manos   tanto izquierda y derecha al mismo tiempo   por lo cual debe de mantener los coches dentro de  carril correspondiente por un laptop de 45 segundos, para aprobar.'
        ,isStable:true
    }]

export function getTestList(){
    return tests;
}