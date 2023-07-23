// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   reactStrictMode: true,
//   compiler:{
//     styledComponents:true,
//     reactRemoveProperties:true
//   }
// }

// export default nextConfig;

import removeImports from 'next-remove-imports'

/** @type {function(import("next").NextConfig): import("next").NextConfig}} */
const removeImportsFun = removeImports({

});

export default removeImportsFun({
  reactStrictMode: true
})


