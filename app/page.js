import axios from "axios";
const fetchData = async () => {
  try {
    const res = await axios.get(
      `${process.env.STRAPI_BASE_URL}/api/histories?populate=*`
    );
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};
export default async function Page() {
  const datas = await fetchData();
  console.log(datas);
  return (
    <div className="container mx-auto">
      <h1>History</h1>
      <div className="grid grid-cols-4 gap-2">
        {datas.map((datas, index) => (
          <div className="flex flex-col" key={index}>
            <div>Promp: {datas.attributes.prompt}</div>
            <img
              src={`${process.env.STRAPI_BASE_URL}${datas.attributes.image.data.attributes.formats.large.url}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
