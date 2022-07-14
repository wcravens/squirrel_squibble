export default {
  type: 'main',
  header: 'Distribute acorns across the Territory - Criteria Assessment (v1.9)',
  content: 'Secret program to bury nuts!',
  scion: [
    {
      type: 'section',
      header: 'Business Context',
      content: '',
      scion: [
        {
          type: 'article',
          header: 'Objectives',
          content: '',
          scion: [ {
            type: 'List',
            items: [
              {
                type: 'ListItem',
                content: 'Item 1'
              },
              {
                type: "ListItem",
                content: 'Item 2',
              },
              {
                type: 'List',
                items: [
                  {
                    type: "ListItem",
                    content: 'Item 2.1',
                  },
                  {
                    type: "ListItem",
                    content: 'Item 2.b',
                  }
                ]

              },
              {
                type: "ListItem",
                content: 'Item 3',
              },
            ]
          } ]
        },

        {
          type: 'article',
          header: 'Background',
          content: ''
        },
        {
          type: 'article',
          header: 'In-Scope',
          content: ''
        },
        {
          type: 'article',
          header: 'Out-of-Scope',
          content: ''
        },
      ]
    },
    {
      type: 'section',
      header: 'Decision Factors',
      content: '',
      scion: [
        {
          type: 'article',
          header: 'Constraints',
          content: '',
        },
        {
          type: 'article',
          header: 'Assumptions',
          content: '',
        },
        {
          type: 'article',
          header: 'Risks',
          content: '',
        },
        {
          type: 'article',
          header: 'Dependencies',
          content: '',
        },
      ]
    }
  ]
}
