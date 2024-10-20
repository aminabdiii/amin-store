import{s as e}from"./supabase-ClnIyvqL.js";async function r({limit:r}){const{data:t,error:a}=await e.from("products").select("*").limit(r).order("created_at",{ascending:!1});if(a)throw new Error(a);return t}async function t(){const{data:r,error:t}=await e.from("products").select("*").gt("discount",0).limit(12);if(t)throw new Error(t);return r}async function a({id:r}){const{data:t,error:a}=await e.from("products").select("*").eq("id",r).single();if(a)throw new Error(a);return t}async function i({category:r,sort:t,presale:a,availableProducts:i,discountProducts:s,search:o,pageParam:n}){const c=e.from("products").select("id, title, postType, price, discount, image, rate , isPreSale, isAvailable").range(9*(n-1),9*n-1);"most-view"===t?c.order("view",{ascending:!1}):"cheapest"===t?c.order("price",{ascending:!0}):"most-expensive"===t?c.order("price",{ascending:!1}):"default"===t?c.order("id",{ascending:!1}):"fastest-shipping"===t?c.order("postType",{ascending:!0}):t?"rate"===t?c.order("rate",{ascending:!1}):"newest"===t&&c.order("created_at",{ascending:!1}):c.order("rate",{ascending:!1}),"true"===a&&c.eq("isPreSale",!0),"true"===i&&c.eq("isAvailable",!0),"true"===s&&c.gt("discount",0),o&&c.ilike("title",`%${o}%`);const{data:d,error:u}=await c.eq("category",r.split("-").join(" "));if(u)throw new Error(u);return d}async function s({sort:r,presale:t,availableProducts:a,discountProducts:i,search:s,pageParam:o}){const n=e.from("products").select("id, title, postType, price, discount, image, rate , isPreSale, isAvailable").range(9*(o-1),9*o-1);"most-view"===r?n.order("view",{ascending:!1}):"cheapest"===r?n.order("price",{ascending:!0}):"most-expensive"===r?n.order("price",{ascending:!1}):"default"===r?n.order("id",{ascending:!1}):"fastest-shipping"===r?n.order("postType",{ascending:!0}):"rate"===r?n.order("rate",{ascending:!1}):r?"newest"===r&&n.order("created_at",{ascending:!1}):n.order("rate",{ascending:!1}),"true"===t&&n.eq("isPreSale",!0),"true"===a&&n.eq("isAvailable",!0),"true"===i&&n.gt("discount",0),s&&n.ilike("title",`%${s}%`);const{data:c,error:d}=await n;if(d)throw new Error(d);return c}async function o({view:r,id:t}){const{data:a,error:i}=await e.from("products").update({view:r}).eq("id",t).select();if(i)throw new Error(i);return a}async function n({...r}){const{data:t,error:a}=await e.from("products").insert([r]);if(a)throw new Error(a);return t}async function c({id:r,...t}){const{data:a,error:i}=await e.from("products").update(t).eq("id",r);if(i)throw new Error(i);return a}async function d({category:r,expectProductId:t}){const{data:a,error:i}=await e.from("products").select("*").eq("category",r).limit(4).neq("id",t);if(i)throw new Error(i);return a}export{t as a,i as b,a as c,d,c as e,s as f,r as g,n as i,o as u};
