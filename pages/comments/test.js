import React from 'react';

const products = [
  { 
    name: 'YKS', 
    id: '1',
    achievements_category: {
      data: {
        id: 1,
        attributes: {
          title: "LGS 2017 BAŞARILARIMIZ",
        },
      },
    },
  },
  { 
    name: 'YKS', 
    id: '2',
    achievements_category: {
      data: {
        id: 1,
        attributes: {
          title: "LGS 2017 BAŞARILARIMIZ",
        },
      },
    },
  },
  { 
    name: 'KPSS', 
    id: '3',
    achievements_category: {
      data: {
        id: 2,
        attributes: {
          title: "LGS 2018 BAŞARILARIMIZ",
        },
      },
    },
  },
  { 
    name: 'KPSS', 
    id: '4',
    achievements_category: {
      data: {
        id: 2,
        attributes: {
          title: "LGS 2018 BAŞARILARIMIZ",
        },
      },
    },
  }

];

const Test = () => {

  const groupByCategory = products.reduce((group, product) => {
    const id = product.achievements_category.data.id;
     group[id] = group[id] ?? [];
     group[id]["title"] = product.achievements_category.data.attributes.title;
     group[id].push(product);
    return group;
  }, {});

   console.log(groupByCategory);

  return (
    <div>
      {/* {[groupByCategory].map((group, i)=>(
        <div key={i}>{group[1].title}</div>
      ))} */}
    </div>
  );
}

export default Test;
