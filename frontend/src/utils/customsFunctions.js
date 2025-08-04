import { enqueueSnackbar } from 'notistack'


export function numberWithCommas(amount) {

  if (amount === 'NaN' || isNaN(amount) || amount === '' || amount === undefined) {
    return ''
  } else {
    return amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }
}
export function decimalNumber(value, to) {
  let number = parseFloat(value || "0").toFixed(to)
  return parseFloat(number)

}
export const PaymentMethod = [{ bank_name: "Cash", account_no: "Cash", account_title: "Cash", _id: "Cash" }, { bank_name: "OutSource", account_no: "OutSource", account_title: "OutSource", _id: "OutSource" }]

export const PageHeadTitle = {
  sale: "Invoice",
  product: "Products",
  customer: "Customers",
  "othercompanies": "Other Companies",
  inventory: "Inventory",
  home: "Menu",
  user: "Users",
  bank: "Bank Account",
  recovery: "Recovery",
  site: "Site Management"
}

export const showAlert = (message, type) => {

  return (
    enqueueSnackbar(message, { variant: type })
  )
}
