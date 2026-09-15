# BrBlog 维护审查记录 — 2026-09-15

## 基线与结论

- 基线：`aeb96ec`，已从本地 `98f9e1c` 快进同步；维护分支 `codex/maintenance`。
- 用户原有未跟踪 `prisma/migrations/` 保留，数据库 schema 未修改。
- GitHub API 返回 92 条开放 Dependabot 告警，响应无下一页：4 critical、47 high、33 medium、8 low。
- npm 官方审计：43 个受影响依赖条目 → 0。原始分布为 4 critical、23 high、13 moderate、3 low。
- 新锁文件逐项匹配全部 92 条告警的版本范围，剩余匹配为 0；这表示本地版本已修复，并不代表远端告警已关闭。
- 未推送、合并或部署。GitHub 在修复进入默认分支并重新扫描后才会更新告警状态。

## 按优先级整理的代码发现

| 优先级 | 发现与触发条件 | 本次处理 |
| --- | --- | --- |
| P1 | 未配置 JWT_SECRET 时使用源码公开的固定密钥，攻击者可签发被接受的令牌 | 删除回退；配置缺失时登录返回业务 code 503、受保护接口拒绝访问 |
| P1 | JWT 仅验证签名是否有效，未验证管理员用户名、角色及到期字段 | 限定 HS256，核对配置的管理员、admin 角色和 exp |
| P1 | 六个写接口依赖精确路径名单；尾斜杠等实际路由匹配变体可能脱离名单 | 鉴权绑定各处理函数，HTTP 测试覆盖原路径、查询参数、尾斜杠及其组合 |
| P1 | Docker 使用 Node 18，与锁定框架的运行要求不兼容；重新克隆远端使本地修复无法进入镜像 | Node 22.23.2 Debian 镜像固定摘要；本地源码构建、npm ci、缓存依赖 |
| P2 | 登录接受非字符串输入，可能触发 crypto 异常；浏览器打印含令牌的响应 | 校验输入并删除登录响应日志 |

保留现有业务响应结构，鉴权失败仍由 JSON 中的 code 表达；本次未迁移为 HTTP 状态码协议。

## 依赖修复

| 依赖 | 基线锁定版本 | 当前锁定版本 |
| --- | --- | --- |
| nuxt | 3.21.2 | 3.21.11 |
| @nuxt/image | 1.11.0 | 2.1.0 |
| ipx | 2.1.1 | 4.0.0-beta.1 |
| sharp | 0.32.6 | 0.35.4 |
| @nuxt/test-utils | 4.0.0 | 4.3.2 |
| vitest | 4.1.1 | 4.1.11 |
| happy-dom | 20.8.7 | 20.14.5 |

Nuxt 保留 3.x。唯一有针对性的运行依赖主版本迁移是 @nuxt/image 1.x → 2.1.0，用于修复图像/SVG 处理链；其 [官方发布说明](https://github.com/nuxt/image/releases/tag/v2.1.0) 说明了 IPX v4 的 SVG 清理修复。IPX 4.0.0-beta.1 来自该稳定版模块的上游依赖选择，已验证 PNG 缩放与页面图片。

其余通过同主版本直接依赖升级及不带 force 的 npm audit fix 更新。未添加 overrides、未关闭告警。系统 npm 11.5.1 在更新时出现 edgesOut 解析错误，使用临时新版 npm 11 完成解析；没有修改全局 npm。干净安装仍用系统 npm 成功。

## 验证

- 原始基线：12 个测试通过，Nuxt 构建通过。
- 修复后：npm ci、Prisma Client 生成、本机 Nuxt 构建通过。
- 41 个测试在本机 Node 24.7.0 和断网 Docker Node 22.23.2 下均通过；Node 22 为项目声明的运行版本。
- Linux amd64 生产镜像构建通过；运行用户 uid 1000；包含 Prisma/OpenSSL 和 sharp 二进制；镜像中无 .env、.git 或源码目录。
- 独立 PostgreSQL 16 测试库：真实登录、文章和友链增改删、隐藏内容隔离、全部写接口鉴权、PNG 图片缩放通过。
- 浏览器已走通首页、博客、友链、Markdown 文章、登录、后台文章编辑和保存；后台编辑页仍会在 md-editor-v3 组件中打印 3 个 `querySelector/querySelectorAll` TypeError，本次未将其误报为“无页面错误”，也未观察到保存或数据结果受影响。

## 部署注意事项与剩余边界

- 部署前设置独立的高熵 JWT_SECRET；更换密钥或管理员用户名会使现有令牌失效。
- 开发服务器默认绑定 127.0.0.1，关闭 Nuxt DevTools。生产环境仍需配置 HTTPS 与合适的入口访问策略。
- 为保持账户兼容，本次沿用已有 SHA-256 密码摘要；应用没有新增登录限速。后续可单独迁移慢密码哈希并配置登录频率限制。
- 第三方分析、评论、远程图片/CDN 的可用性不在本地验收范围，浏览器测试阻止了外部请求。
- npm 审计及版本比对仅覆盖已知依赖告警，不等同于完整渗透测试或操作系统镜像漏洞扫描。
- 数据库变更仅执行在新建隔离测试容器中，未连接或修改生产数据库。

## Dependabot 逐项对照

每行均已检查当前版本不落在对应 GHSA 的受影响范围。GitHub 的 runtime 分类也包含构建工具；例如 DevTools 风险针对开发主机，并不表示生产服务器启用了该功能。

| 告警 | 级别 | 包 | 原受影响版本 | 当前版本或移除 | 公告 |
| --- | --- | --- | --- | --- | --- |
| [#185](https://github.com/BrackRat/BrBlog/security/dependabot/185) | critical | @nuxt/devtools | 3.2.4 | 3.4.2 | [GHSA-279x-mwfv-vcqv](https://github.com/advisories/GHSA-279x-mwfv-vcqv) |
| [#174](https://github.com/BrackRat/BrBlog/security/dependabot/174) | critical | seroval | 1.5.1 | 1.6.7 | [GHSA-mv8w-475r-vwqw](https://github.com/advisories/GHSA-mv8w-475r-vwqw) |
| [#173](https://github.com/BrackRat/BrBlog/security/dependabot/173) | critical | tar | 7.5.13 | 7.5.22 | [GHSA-23hp-3jrh-7fpw](https://github.com/advisories/GHSA-23hp-3jrh-7fpw) |
| [#148](https://github.com/BrackRat/BrBlog/security/dependabot/148) | critical | shell-quote | 1.8.3 | 1.10.0 | [GHSA-w7jw-789q-3m8p](https://github.com/advisories/GHSA-w7jw-789q-3m8p) |
| [#207](https://github.com/BrackRat/BrBlog/security/dependabot/207) | high | svgo | 3.3.3 | 4.1.0 | [GHSA-w27v-7q3p-w38r](https://github.com/advisories/GHSA-w27v-7q3p-w38r) |
| [#206](https://github.com/BrackRat/BrBlog/security/dependabot/206) | high | sharp | 0.32.6 | 0.35.4 | [GHSA-rgj7-g3m4-5g8c](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c) |
| [#205](https://github.com/BrackRat/BrBlog/security/dependabot/205) | high | svgo | 4.0.1 | 4.1.0 | [GHSA-w27v-7q3p-w38r](https://github.com/advisories/GHSA-w27v-7q3p-w38r) |
| [#203](https://github.com/BrackRat/BrBlog/security/dependabot/203) | high | browserslist | 4.28.1 | 4.28.9 | [GHSA-73wf-gq98-2v4g](https://github.com/advisories/GHSA-73wf-gq98-2v4g) |
| [#202](https://github.com/BrackRat/BrBlog/security/dependabot/202) | high | browserslist | 4.28.1 | 4.28.9 | [GHSA-c83g-rgw3-j3cx](https://github.com/advisories/GHSA-c83g-rgw3-j3cx) |
| [#201](https://github.com/BrackRat/BrBlog/security/dependabot/201) | high | nanoid | 3.3.11 | 3.3.19 | [GHSA-xwg4-73v4-xw9w](https://github.com/advisories/GHSA-xwg4-73v4-xw9w) |
| [#196](https://github.com/BrackRat/BrBlog/security/dependabot/196) | high | brace-expansion | 2.0.2 | 2.1.7, 5.0.12, 1.1.21 | [GHSA-rgw5-rvv9-x895](https://github.com/advisories/GHSA-rgw5-rvv9-x895) |
| [#195](https://github.com/BrackRat/BrBlog/security/dependabot/195) | high | brace-expansion | 2.0.2 | 2.1.7, 5.0.12, 1.1.21 | [GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp) |
| [#194](https://github.com/BrackRat/BrBlog/security/dependabot/194) | high | nanoid | 3.3.11 | 3.3.19 | [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8) |
| [#190](https://github.com/BrackRat/BrBlog/security/dependabot/190) | high | nanoid | 3.3.11 | 3.3.19 | [GHSA-28wg-ghj8-5hjv](https://github.com/advisories/GHSA-28wg-ghj8-5hjv) |
| [#187](https://github.com/BrackRat/BrBlog/security/dependabot/187) | high | nuxt | 3.21.2 | 3.21.11 | [GHSA-9pgf-384g-p7mv](https://github.com/advisories/GHSA-9pgf-384g-p7mv) |
| [#186](https://github.com/BrackRat/BrBlog/security/dependabot/186) | high | nuxt | 3.21.2 | 3.21.11 | [GHSA-9473-5f9j-94wq](https://github.com/advisories/GHSA-9473-5f9j-94wq) |
| [#183](https://github.com/BrackRat/BrBlog/security/dependabot/183) | high | nuxt | 3.21.2 | 3.21.11 | [GHSA-hxcr-hm88-mpq6](https://github.com/advisories/GHSA-hxcr-hm88-mpq6) |
| [#182](https://github.com/BrackRat/BrBlog/security/dependabot/182) | high | brace-expansion | 5.0.4 | 2.1.7, 5.0.12, 1.1.21 | [GHSA-rgw5-rvv9-x895](https://github.com/advisories/GHSA-rgw5-rvv9-x895) |
| [#181](https://github.com/BrackRat/BrBlog/security/dependabot/181) | high | brace-expansion | 2.0.2 | 2.1.7, 5.0.12, 1.1.21 | [GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg) |
| [#180](https://github.com/BrackRat/BrBlog/security/dependabot/180) | high | postcss | 8.5.8 | 8.5.28 | [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849) |
| [#179](https://github.com/BrackRat/BrBlog/security/dependabot/179) | high | brace-expansion | 5.0.4 | 2.1.7, 5.0.12, 1.1.21 | [GHSA-mh99-v99m-4gvg](https://github.com/advisories/GHSA-mh99-v99m-4gvg) |
| [#178](https://github.com/BrackRat/BrBlog/security/dependabot/178) | high | postcss | 8.5.8 | 8.5.28 | [GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q) |
| [#176](https://github.com/BrackRat/BrBlog/security/dependabot/176) | high | tar | 7.5.13 | 7.5.22 | [GHSA-r292-9mhp-454m](https://github.com/advisories/GHSA-r292-9mhp-454m) |
| [#175](https://github.com/BrackRat/BrBlog/security/dependabot/175) | high | brace-expansion | 1.1.12 | 2.1.7, 5.0.12, 1.1.21 | [GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp) |
| [#170](https://github.com/BrackRat/BrBlog/security/dependabot/170) | high | tar | 7.5.13 | 7.5.22 | [GHSA-8x88-c5mf-7j5w](https://github.com/advisories/GHSA-8x88-c5mf-7j5w) |
| [#169](https://github.com/BrackRat/BrBlog/security/dependabot/169) | high | shell-quote | 1.8.3 | 1.10.0 | [GHSA-395f-4hp3-45gv](https://github.com/advisories/GHSA-395f-4hp3-45gv) |
| [#168](https://github.com/BrackRat/BrBlog/security/dependabot/168) | high | sharp | 0.32.6 | 0.35.4 | [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) |
| [#167](https://github.com/BrackRat/BrBlog/security/dependabot/167) | high | svgo | 3.3.3 | 4.1.0 | [GHSA-2p49-hgcm-8545](https://github.com/advisories/GHSA-2p49-hgcm-8545) |
| [#166](https://github.com/BrackRat/BrBlog/security/dependabot/166) | high | linkify-it | 5.0.0 | 5.0.2 | [GHSA-v245-v573-v5vm](https://github.com/advisories/GHSA-v245-v573-v5vm) |
| [#165](https://github.com/BrackRat/BrBlog/security/dependabot/165) | high | svgo | 4.0.1 | 4.1.0 | [GHSA-2p49-hgcm-8545](https://github.com/advisories/GHSA-2p49-hgcm-8545) |
| [#164](https://github.com/BrackRat/BrBlog/security/dependabot/164) | high | brace-expansion | 5.0.4 | 2.1.7, 5.0.12, 1.1.21 | [GHSA-3jxr-9vmj-r5cp](https://github.com/advisories/GHSA-3jxr-9vmj-r5cp) |
| [#163](https://github.com/BrackRat/BrBlog/security/dependabot/163) | high | linkify-it | 5.0.0 | 5.0.2 | [GHSA-22p9-wv53-3rq4](https://github.com/advisories/GHSA-22p9-wv53-3rq4) |
| [#161](https://github.com/BrackRat/BrBlog/security/dependabot/161) | high | ws | 8.20.0 | 8.21.3 | [GHSA-96hv-2xvq-fx4p](https://github.com/advisories/GHSA-96hv-2xvq-fx4p) |
| [#156](https://github.com/BrackRat/BrBlog/security/dependabot/156) | high | nuxt | 3.21.2 | 3.21.11 | [GHSA-mm7m-92g8-7m47](https://github.com/advisories/GHSA-mm7m-92g8-7m47) |
| [#152](https://github.com/BrackRat/BrBlog/security/dependabot/152) | high | vite | 7.3.1 | 7.3.6 | [GHSA-fx2h-pf6j-xcff](https://github.com/advisories/GHSA-fx2h-pf6j-xcff) |
| [#143](https://github.com/BrackRat/BrBlog/security/dependabot/143) | high | js-cookie | 3.0.5 | 3.0.8 | [GHSA-qjx8-664m-686j](https://github.com/advisories/GHSA-qjx8-664m-686j) |
| [#138](https://github.com/BrackRat/BrBlog/security/dependabot/138) | high | simple-git | 3.33.0 | 3.36.0 | [GHSA-hffm-xvc3-vprc](https://github.com/advisories/GHSA-hffm-xvc3-vprc) |
| [#137](https://github.com/BrackRat/BrBlog/security/dependabot/137) | high | devalue | 5.6.4 | 5.9.2 | [GHSA-77vg-94rm-hx3p](https://github.com/advisories/GHSA-77vg-94rm-hx3p) |
| [#133](https://github.com/BrackRat/BrBlog/security/dependabot/133) | high | lodash | 4.17.23 | 4.18.1 | [GHSA-r5fr-rjxr-66jc](https://github.com/advisories/GHSA-r5fr-rjxr-66jc) |
| [#131](https://github.com/BrackRat/BrBlog/security/dependabot/131) | high | vite | 7.3.1 | 7.3.6 | [GHSA-p9ff-h696-f583](https://github.com/advisories/GHSA-p9ff-h696-f583) |
| [#129](https://github.com/BrackRat/BrBlog/security/dependabot/129) | high | vite | 7.3.1 | 7.3.6 | [GHSA-v2wj-q39q-566r](https://github.com/advisories/GHSA-v2wj-q39q-566r) |
| [#128](https://github.com/BrackRat/BrBlog/security/dependabot/128) | high | defu | 6.1.4 | 6.1.7 | [GHSA-737v-mqg7-c878](https://github.com/advisories/GHSA-737v-mqg7-c878) |
| [#126](https://github.com/BrackRat/BrBlog/security/dependabot/126) | high | happy-dom | 20.8.7 | 20.14.5 | [GHSA-w4gp-fjgq-3q4g](https://github.com/advisories/GHSA-w4gp-fjgq-3q4g) |
| [#124](https://github.com/BrackRat/BrBlog/security/dependabot/124) | high | node-forge | 1.3.3 | 1.4.0 | [GHSA-5m6q-g25r-mvwx](https://github.com/advisories/GHSA-5m6q-g25r-mvwx) |
| [#123](https://github.com/BrackRat/BrBlog/security/dependabot/123) | high | node-forge | 1.3.3 | 1.4.0 | [GHSA-ppp5-5v6c-4jwp](https://github.com/advisories/GHSA-ppp5-5v6c-4jwp) |
| [#122](https://github.com/BrackRat/BrBlog/security/dependabot/122) | high | node-forge | 1.3.3 | 1.4.0 | [GHSA-q67f-28xg-22rw](https://github.com/advisories/GHSA-q67f-28xg-22rw) |
| [#121](https://github.com/BrackRat/BrBlog/security/dependabot/121) | high | node-forge | 1.3.3 | 1.4.0 | [GHSA-2328-f5f3-gj25](https://github.com/advisories/GHSA-2328-f5f3-gj25) |
| [#119](https://github.com/BrackRat/BrBlog/security/dependabot/119) | high | happy-dom | 20.8.7 | 20.14.5 | [GHSA-6q6h-j7hj-3r64](https://github.com/advisories/GHSA-6q6h-j7hj-3r64) |
| [#113](https://github.com/BrackRat/BrBlog/security/dependabot/113) | high | h3 | 2.0.1-rc.11 | 1.15.11 | [GHSA-3vj8-jmxq-cgj5](https://github.com/advisories/GHSA-3vj8-jmxq-cgj5) |
| [#112](https://github.com/BrackRat/BrBlog/security/dependabot/112) | high | h3 | 2.0.1-rc.11 | 1.15.11 | [GHSA-22cc-p3c6-wpvm](https://github.com/advisories/GHSA-22cc-p3c6-wpvm) |
| [#109](https://github.com/BrackRat/BrBlog/security/dependabot/109) | high | flatted | 3.4.0 | 3.4.4 | [GHSA-rf6f-7fwh-wjgh](https://github.com/advisories/GHSA-rf6f-7fwh-wjgh) |
| [#212](https://github.com/BrackRat/BrBlog/security/dependabot/212) | medium | vitest | 4.1.1 | 4.1.11 | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) |
| [#211](https://github.com/BrackRat/BrBlog/security/dependabot/211) | medium | baseline-browser-mapping | 2.10.10 | 2.11.23 | [GHSA-w5vr-8v7q-w6rv](https://github.com/advisories/GHSA-w5vr-8v7q-w6rv) |
| [#210](https://github.com/BrackRat/BrBlog/security/dependabot/210) | medium | colord | 2.9.3 | 依赖已移除 | [GHSA-2wm5-q62r-hmrv](https://github.com/advisories/GHSA-2wm5-q62r-hmrv) |
| [#209](https://github.com/BrackRat/BrBlog/security/dependabot/209) | medium | @vitest/mocker | 4.1.1 | 4.1.11 | [GHSA-82fw-gwwq-j7x9](https://github.com/advisories/GHSA-82fw-gwwq-j7x9) |
| [#208](https://github.com/BrackRat/BrBlog/security/dependabot/208) | medium | svgo | 3.3.3 | 4.1.0 | [GHSA-4vpr-x523-8j87](https://github.com/advisories/GHSA-4vpr-x523-8j87) |
| [#204](https://github.com/BrackRat/BrBlog/security/dependabot/204) | medium | svgo | 4.0.1 | 4.1.0 | [GHSA-4vpr-x523-8j87](https://github.com/advisories/GHSA-4vpr-x523-8j87) |
| [#193](https://github.com/BrackRat/BrBlog/security/dependabot/193) | medium | nuxt | 3.21.2 | 3.21.11 | [GHSA-934w-87qh-qr26](https://github.com/advisories/GHSA-934w-87qh-qr26) |
| [#192](https://github.com/BrackRat/BrBlog/security/dependabot/192) | medium | nuxt | 3.21.2 | 3.21.11 | [GHSA-c9cv-mq2m-ppp3](https://github.com/advisories/GHSA-c9cv-mq2m-ppp3) |
| [#191](https://github.com/BrackRat/BrBlog/security/dependabot/191) | medium | postcss | 8.5.8 | 8.5.28 | [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp) |
| [#184](https://github.com/BrackRat/BrBlog/security/dependabot/184) | medium | nuxt | 3.21.2 | 3.21.11 | [GHSA-48hr-524c-v5w3](https://github.com/advisories/GHSA-48hr-524c-v5w3) |
| [#172](https://github.com/BrackRat/BrBlog/security/dependabot/172) | medium | tar | 7.5.13 | 7.5.22 | [GHSA-w8wr-v893-vjvp](https://github.com/advisories/GHSA-w8wr-v893-vjvp) |
| [#171](https://github.com/BrackRat/BrBlog/security/dependabot/171) | medium | tar | 7.5.13 | 7.5.22 | [GHSA-gvwx-54wh-qm9j](https://github.com/advisories/GHSA-gvwx-54wh-qm9j) |
| [#160](https://github.com/BrackRat/BrBlog/security/dependabot/160) | medium | tar | 7.5.13 | 7.5.22 | [GHSA-vmf3-w455-68vh](https://github.com/advisories/GHSA-vmf3-w455-68vh) |
| [#155](https://github.com/BrackRat/BrBlog/security/dependabot/155) | medium | nuxt | 3.21.2 | 3.21.11 | [GHSA-534h-c3cw-v3h9](https://github.com/advisories/GHSA-534h-c3cw-v3h9) |
| [#154](https://github.com/BrackRat/BrBlog/security/dependabot/154) | medium | launch-editor | 2.13.2 | 2.14.1 | [GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3) |
| [#153](https://github.com/BrackRat/BrBlog/security/dependabot/153) | medium | vite | 7.3.1 | 7.3.6 | [GHSA-v6wh-96g9-6wx3](https://github.com/advisories/GHSA-v6wh-96g9-6wx3) |
| [#151](https://github.com/BrackRat/BrBlog/security/dependabot/151) | medium | markdown-it | 14.1.1 | 14.3.2 | [GHSA-6v5v-wf23-fmfq](https://github.com/advisories/GHSA-6v5v-wf23-fmfq) |
| [#147](https://github.com/BrackRat/BrBlog/security/dependabot/147) | medium | nuxt | 3.21.2 | 3.21.11 | [GHSA-hg3f-28rg-4jxj](https://github.com/advisories/GHSA-hg3f-28rg-4jxj) |
| [#146](https://github.com/BrackRat/BrBlog/security/dependabot/146) | medium | ws | 8.20.0 | 8.21.3 | [GHSA-58qx-3vcg-4xpx](https://github.com/advisories/GHSA-58qx-3vcg-4xpx) |
| [#145](https://github.com/BrackRat/BrBlog/security/dependabot/145) | medium | @nuxt/nitro-server | 3.21.2 | 3.21.11 | [GHSA-hg3f-28rg-4jxj](https://github.com/advisories/GHSA-hg3f-28rg-4jxj) |
| [#144](https://github.com/BrackRat/BrBlog/security/dependabot/144) | medium | serialize-javascript | 7.0.4 | 7.1.1 | [GHSA-qj8w-gfj5-8c6v](https://github.com/advisories/GHSA-qj8w-gfj5-8c6v) |
| [#140](https://github.com/BrackRat/BrBlog/security/dependabot/140) | medium | nuxt | 3.21.2 | 3.21.11 | [GHSA-fx6j-w5w5-h468](https://github.com/advisories/GHSA-fx6j-w5w5-h468) |
| [#139](https://github.com/BrackRat/BrBlog/security/dependabot/139) | medium | brace-expansion | 5.0.4 | 2.1.7, 5.0.12, 1.1.21 | [GHSA-jxxr-4gwj-5jf2](https://github.com/advisories/GHSA-jxxr-4gwj-5jf2) |
| [#136](https://github.com/BrackRat/BrBlog/security/dependabot/136) | medium | nitropack | 2.13.2 | 2.13.4 | [GHSA-5w89-w975-hf9q](https://github.com/advisories/GHSA-5w89-w975-hf9q) |
| [#135](https://github.com/BrackRat/BrBlog/security/dependabot/135) | medium | nitropack | 2.13.2 | 2.13.4 | [GHSA-9phm-9p8f-hw5m](https://github.com/advisories/GHSA-9phm-9p8f-hw5m) |
| [#134](https://github.com/BrackRat/BrBlog/security/dependabot/134) | medium | lodash | 4.17.23 | 4.18.1 | [GHSA-f23m-r3pf-42rh](https://github.com/advisories/GHSA-f23m-r3pf-42rh) |
| [#132](https://github.com/BrackRat/BrBlog/security/dependabot/132) | medium | unhead | 2.1.12 | 2.1.17 | [GHSA-95h2-gj7x-gx9w](https://github.com/advisories/GHSA-95h2-gj7x-gx9w) |
| [#130](https://github.com/BrackRat/BrBlog/security/dependabot/130) | medium | vite | 7.3.1 | 7.3.6 | [GHSA-4w7w-66w2-5vf9](https://github.com/advisories/GHSA-4w7w-66w2-5vf9) |
| [#125](https://github.com/BrackRat/BrBlog/security/dependabot/125) | medium | brace-expansion | 2.0.2 | 2.1.7, 5.0.12, 1.1.21 | [GHSA-f886-m6hf-6m8v](https://github.com/advisories/GHSA-f886-m6hf-6m8v) |
| [#120](https://github.com/BrackRat/BrBlog/security/dependabot/120) | medium | brace-expansion | 5.0.4 | 2.1.7, 5.0.12, 1.1.21 | [GHSA-f886-m6hf-6m8v](https://github.com/advisories/GHSA-f886-m6hf-6m8v) |
| [#118](https://github.com/BrackRat/BrBlog/security/dependabot/118) | medium | srvx | 0.10.1 | 0.11.22, 0.12.8 | [GHSA-p36q-q72m-gchr](https://github.com/advisories/GHSA-p36q-q72m-gchr) |
| [#116](https://github.com/BrackRat/BrBlog/security/dependabot/116) | medium | h3 | 2.0.1-rc.11 | 1.15.11 | [GHSA-4hxc-9384-m385](https://github.com/advisories/GHSA-4hxc-9384-m385) |
| [#114](https://github.com/BrackRat/BrBlog/security/dependabot/114) | medium | h3 | 2.0.1-rc.11 | 1.15.11 | [GHSA-wr4h-v87w-p3r7](https://github.com/advisories/GHSA-wr4h-v87w-p3r7) |
| [#199](https://github.com/BrackRat/BrBlog/security/dependabot/199) | low | postcss-selector-parser | 6.1.2 | 6.1.4, 7.1.6 | [GHSA-w9m9-85wc-3x92](https://github.com/advisories/GHSA-w9m9-85wc-3x92) |
| [#198](https://github.com/BrackRat/BrBlog/security/dependabot/198) | low | postcss-selector-parser | 7.1.1 | 6.1.4, 7.1.6 | [GHSA-w9m9-85wc-3x92](https://github.com/advisories/GHSA-w9m9-85wc-3x92) |
| [#162](https://github.com/BrackRat/BrBlog/security/dependabot/162) | low | @babel/core | 7.29.0 | 7.29.7 | [GHSA-4x5r-pxfx-6jf8](https://github.com/advisories/GHSA-4x5r-pxfx-6jf8) |
| [#158](https://github.com/BrackRat/BrBlog/security/dependabot/158) | low | nuxt | 3.21.2 | 3.21.11 | [GHSA-m3q2-p4fw-w38m](https://github.com/advisories/GHSA-m3q2-p4fw-w38m) |
| [#149](https://github.com/BrackRat/BrBlog/security/dependabot/149) | low | esbuild | 0.27.4 | 0.28.2 | [GHSA-g7r4-m6w7-qqqr](https://github.com/advisories/GHSA-g7r4-m6w7-qqqr) |
| [#142](https://github.com/BrackRat/BrBlog/security/dependabot/142) | low | nuxt | 3.21.2 | 3.21.11 | [GHSA-g8wj-3cr3-6w7v](https://github.com/advisories/GHSA-g8wj-3cr3-6w7v) |
| [#141](https://github.com/BrackRat/BrBlog/security/dependabot/141) | low | @nuxt/nitro-server | 3.21.2 | 3.21.11 | [GHSA-g8wj-3cr3-6w7v](https://github.com/advisories/GHSA-g8wj-3cr3-6w7v) |
| [#115](https://github.com/BrackRat/BrBlog/security/dependabot/115) | low | h3 | 2.0.1-rc.11 | 1.15.11 | [GHSA-2j6q-whv2-gh6w](https://github.com/advisories/GHSA-2j6q-whv2-gh6w) |
