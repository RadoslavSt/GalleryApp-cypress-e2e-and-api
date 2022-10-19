

export const HeaderValidation = (datas, expectedDatas) => {
  datas.each((data, index) => {
    console.log(data);
    cy.wrap(data[0].innerText).should("contain", expectedDatas[index]);
  });

  if (expectedDatas[3] === "Register") {
    cy.contains(expectedDatas[3]).click();
  }
};

export const registerValidation = (labels, expectedLabels) => {
  labels.each((label, index) => {
    console.log(label);
    cy.wrap(label[0].innerText).should("contain", expectedLabels[index]);
  });
};

export const typeUser = (inputs, typeDatas) => {
  inputs.each((input, index) => {
    cy.wrap(input[0]).type(typeDatas[index]);
  });
};

export const createGalleryValidation = (labels, expectLabels) => {
  labels.each((label, index) => {
    console.log(label);
    cy.wrap(label[0].outerText).should("include", expectLabels[index]);
  });
};

export const Cells1 = (cells,naslov) => {
  cells.then((cell) => {    
    console.log(cell);
    cy.wrap(cell[0].innerText).should('include', naslov)   //cell [0] nam oznacava celiju 1 iz razloga sto koristimo THEN, a ne each
    
  });
};

export const typeUrls = (inputs,urlDatas)=>{
  inputs.each((input,index)=>{

    cy.wrap(input).type(urlDatas[index])
   // cy.contains('Add image').click()
    
  })
}


