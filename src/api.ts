// http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=2019&solMonth=03&ServiceKey=서비스키
const API_KEY =
  "EOZd3IRPE%2BLZivWRWYW%2BC1ekzk%2BjgpXQXVmPVP%2Beu%2BnkrNSTZZBYlRQLDSKl%2BjZE2q%2F%2BUBs2awMAq82WKHONJA%3D%3D";

export const fetchHolidays = async () => {
  const json = await (
    await fetch(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=2019&solMonth=03&ServiceKey=${API_KEY}
	`)
  ).json();
};
