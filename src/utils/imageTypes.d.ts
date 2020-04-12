// I'll be honest, this is only done so that TS understands that svgs can be
//  modules because Webpack will process them and they will be modules, but
//  VSCode will have trouble understanding that 🤷‍♂️
declare module "*.png";
declare module "*.svg";
