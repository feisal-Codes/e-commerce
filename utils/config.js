

const domainName ="http://172.104.141.50:8096"


const config= {
     productsCategory: `${domainName}/products/list?category=`,
     singleProduct:`${domainName}/products/list/`,
     registerUser:`${domainName}/customer/register`,
     login:`${domainName}/customer/authorize`,
     placeOrder:`${domainName}/customer/orders`,
     categories:`${domainName}/sneakers/categories`,
     newArrivals:`${domainName}/products/new`,
     featured:`${domainName}/products/featured-products`,
     popular: `${domainName}/products/popular`,

}




export default config