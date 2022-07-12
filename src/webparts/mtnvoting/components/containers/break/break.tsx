import * as React from 'react';

<<<<<<< HEAD
 const NewLineToBr = ({children = ""}) =>{
    return children.split('\\n').reduce(function (arr,line) {
      return arr.concat(
        line,
        <br />
      );
    },[]);
  }

  export default NewLineToBr;
=======
const NewLineToBr = ({ children = "" }) => {
  return children.split('\\n').reduce(function (arr, line) {
    return arr.concat(
      line,
      <br />
    );
  }, []);
}

export default NewLineToBr;
>>>>>>> 7d56b80bdc1298112ef51e7119eb5e1119c1f4a3
