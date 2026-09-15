# 部署与维护

## 环境

使用 Node.js 22（至少 22.12.0，建议最新 22.x 安全补丁）和 PostgreSQL。
仓库提供 `.nvmrc`；Docker 基础镜像固定为 Node 22 Debian bookworm slim 的摘要。

复制 `.env.example` 为 `.env`，设置以下变量：

- `DATABASE_URL`：PostgreSQL 连接地址。
- `ADMIN_USERNAME`：管理员用户名。
- `ADMIN_HASHED_PASSWORD`：管理员密码的 SHA-256 十六进制摘要，沿用现有登录格式。
- `JWT_SECRET`：独立的高熵随机密钥，可用 `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` 生成。

不得提交真实 `.env`。缺失鉴权配置时登录失败，缺失 JWT 密钥时所有受保护接口拒绝访问。
更换密钥或管理员用户名会使旧令牌失效。令牌采用 HS256，包含管理员角色，有效期一小时。

## 本地运行

```sh
npm ci
npx prisma generate
npm run dev
```

开发服务器默认仅监听 `127.0.0.1:5137`。需要局域网访问时显式指定 `npm run dev -- --host 0.0.0.0`。

首次初始化**新建空数据库**时，核对 `DATABASE_URL` 后执行 `npx prisma db push`。
已有数据库需先备份并审查 schema 差异；应用和镜像启动不会自动执行数据库变更。

```sh
npm test -- --run
npm run build
node --env-file=.env .output/server/index.mjs
```

生产服务器已通过服务管理器注入环境变量时可使用 `npm start`。

## Docker

```sh
docker build -t brblog:maintenance .
docker run -d --name brblog --env-file .env -p 127.0.0.1:3000:3000 brblog:maintenance
```

容器内的 `DATABASE_URL` 应指向容器可访问的数据库地址，不能使用宿主机视角的 `localhost`。
通过反向代理提供 HTTPS；部署所需密钥在运行时注入，不参与镜像构建。

构建使用当前目录源码及锁文件，先缓存依赖，再生成 Prisma Client 和 Nuxt 输出。
运行镜像仅复制 `.output`，使用非 root 用户、OpenSSL 和 dumb-init；保留 Prisma 引擎需要的运行时文件。
更新 Node 镜像时同时更新 Dockerfile 中的版本/摘要，并重跑构建及数据库访问验证。

回滚时使用之前验证过的镜像标签和相同数据库。本次维护不更改数据库 schema。

## 安全审计

```sh
npm audit --registry=https://registry.npmjs.org
```

部分镜像源不提供 npm 安全审计端点，必须指定官方 registry。
同时检查 GitHub Security → Dependabot；GitHub 的 runtime 分类包含构建工具，需结合实际运行路径判断风险。
不要使用 `npm audit fix --force` 批量跨主版本升级。

本次维护记录见 [maintenance-2026-09.md](maintenance-2026-09.md)。
