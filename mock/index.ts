export default {
  'GET /api/template': {
    code: 200,
    data: {
      tag: 'Card',
      props: {
        title: '模拟页面',
      },
      children: [
        {
          tag: "Form",
          props: {
          
          },
          children: [
            { 
              tag: "Row", 
              props: { gutter: 24 }, 
              children: [
                { tag: "Col", props: { span: 4 } , }
              ] 
            }
          ]
        },
        {
          tag: 'Tabel', props: {

          }
        }
      ]
    }
  }
}