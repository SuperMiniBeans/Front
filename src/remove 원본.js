  // 체크한 상품 삭제하기
  // const onRemove = (id) => { // 뭘 삭제할지 말 해줘야함 
  //   let params = [];
  //   for(let i=0; i<checkedProducts.length; i++){
  //     params.push({
  //       productNumber: checkedProducts[i]
  //     });
  //   }

  //   axios.post('/productDelete', params)
  //     .then((response, id) => {
  //       console.log(response.data);
  //       dispatch(removeProductList(response.data.productNumber));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       console.log('체크된 항목', checkedProducts)
  //     })
  // }


  
  // 객체에서 productNumber와 같은 id 찾아서 데이터 불러오기 ↓
  // // let productNumberItem = products.find((data) => {return data.productNumber === Number(id)});