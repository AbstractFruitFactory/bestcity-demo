const buildSpecMap = (specifications = []) => {
  return specifications.reduce((acc, spec) => {
    if (spec && spec.title) {
      acc[spec.title.toLowerCase()] = spec.description;
    }
    return acc;
  }, {});
};

const parseNumber = (value) => {
  if (!value) return 0;
  const numeric = String(value).replace(/[^\d.]/g, "");
  return numeric ? Number(numeric) : 0;
};

const getStatusFromFunded = (funded) => {
  const fundedValue = parseNumber(funded);
  if (fundedValue >= 90) return "Almost Funded";
  if (fundedValue <= 50) return "New Listing";
  return "Active Investment";
};

export const mapProductToProperty = (product) => {
  const specs = buildSpecMap(product?.specifications);
  const priceUsd = product?.price ?? 0;
  const priceEth = Number((priceUsd / 2000).toFixed(2));
  const funded = specs["funded"] || "0%";
  const images = (product?.images || []).map((image) => image.url).filter(Boolean);

  return {
    id: product?._id || product?.id,
    title: product?.name || "Untitled Property",
    description: product?.description || "",
    price: {
      usd: priceUsd,
      eth: priceEth
    },
    location: specs["location"] || "Unknown",
    image: product?.images?.[0]?.url || "",
    images,
    type: product?.category || "house",
    roi: specs["roi"] || "0%",
    metrics: {
      totalInvestors: parseNumber(specs["total investors"]),
      funded,
      minInvestment: specs["min investment"] || "$10",
      monthlyIncome: specs["monthly income"] || "-",
      appreciation: specs["appreciation"] || "-"
    },
    status: specs["status"] || getStatusFromFunded(funded),
    features: product?.highlights || [],
    tokenDetails: {
      totalTokens: Number(product?.stock || parseNumber(specs["total tokens"])),
      availableTokens: parseNumber(specs["available tokens"]),
      tokenPrice: specs["token price"] || "$10"
    }
  };
};
