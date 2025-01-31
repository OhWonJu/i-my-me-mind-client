export const cookieParser = (cookie: string) => {
  const [keyValue, ...options] = cookie.split(";");
  const [key, value] = keyValue.split("=");

  // console.log(options);

  const cookieOptions: Record<string, any> = {};

  options.forEach((option) => {
    const [optKey, optValue] = option.trim().split("=");

    switch (optKey.toLowerCase()) {
      case "domain":
        cookieOptions.domain = optValue;
        break;
      case "max-age":
        cookieOptions.maxAge = Number(optValue);
        break;
      case "path":
        cookieOptions.path = optValue;
        break;
      case "httponly":
        cookieOptions.httpOnly = true;
        break;
      case "secure":
        cookieOptions.secure = true;
        break;
      case "samesite":
        cookieOptions.sameSite = optValue as "strict" | "lax" | "none";
        break;
    }
  });

  return { key, value, cookieOptions };
};
