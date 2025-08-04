export const paginationOptions = (page_number, page_size, sortBy, order) => {
    let page = parseInt(page_number) || 1;
  
    let nextPage = page + 1;
  
    let limit = parseInt(page_size) ? parseInt(page_size) : 10;
    let sortObj = {};
    sortObj[`${sortBy}`] = order;
    let options = {
      page: page,
      limit: limit,
      sort: sortObj,
      allowDiskUse: true
    };
  
  
    let optionsFull = { options, nextPage };
  
    return optionsFull;
  };
  