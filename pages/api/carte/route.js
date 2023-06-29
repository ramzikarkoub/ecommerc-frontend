import { connectToDB } from "@/utils/database";
import { Product } from "@models/Product";

export default async function handle(req, res) {
  console.log(req.body);
  // ids = await req.json();
  // await connectToDB();
  // const CartList = await Product.find({ _id: ids });
  // res.json(CartList);
}
