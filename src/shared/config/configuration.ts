export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV,
  clientUrl: process.env.CLIENT_URL,
  allowedUser: parseInt(process.env.ALLOWED_USER),
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackUrl: process.env.KAKAO_CALLBACK_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRE_IN),
    refreshTokenExpiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRE_IN),
  },
  github: {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH,
  },
});
