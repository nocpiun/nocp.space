---
title: Gitlab EE 破解手册
author: 夜法之书
tags:
- "开发"
- "Gitlab"
- "教程"
excerpt: "在网上发现了这篇破解Gitlab EE的文章，觉得颇有价值，于是转载至此。<br>_原文：[破解Gitlab EE](https://blog.17lai.site/posts/29a820b3/)_"
date: 2026-06-22
---

由于需要一些镜像等gitlab高级功能，所以破解Gitlab EE版本。你能信么？这些破解方法来自官方自己的文档！个人研究使用，企业请付费购买正版授权。

已经在Gitlab EE 18.5上验证可行。

> [!info]
> 转载注：本人已在Gitlab EE 19.1上验证可行。

## 1. 安装Ruby

安装完Gitlab EE之后，需要先安装Ruby。

```bash
yum install ruby
```

Ruby版本需要`2.3`或以上。

## 2. 生成许可证

```bash
gem install gitlab-license
```

创建一个rb文件

```rb
require "openssl"
require "gitlab/license"
 
key_pair = OpenSSL::PKey::RSA.generate(2048)
File.open("license_key", "w") { |f| f.write(key_pair.to_pem) }
 
public_key = key_pair.public_key
File.open("license_key.pub", "w") { |f| f.write(public_key.to_pem) }
 
private_key = OpenSSL::PKey::RSA.new File.read("license_key")
Gitlab::License.encryption_key = private_key
 
license = Gitlab::License.new
license.licensee = {
  "Name" => "none",
  "Company" => "none",
  "Email" => "example@test.com",
}
license.starts_at = Date.new(2020, 1, 1) # 开始时间
license.expires_at = Date.new(2050, 1, 1) # 结束时间
license.notify_admins_at = Date.new(2049, 12, 1)
license.notify_users_at = Date.new(2049, 12, 1)
license.block_changes_at = Date.new(2050, 1, 1)
license.restrictions = {
  active_user_count: 10000,
}
 
puts "License:"
puts license
 
data = license.export
puts "Exported license:"
puts data
File.open("GitLabBV.gitlab-license", "w") { |f| f.write(data) }
 
public_key = OpenSSL::PKey::RSA.new File.read("license_key.pub")
Gitlab::License.encryption_key = public_key
 
data = File.read("GitLabBV.gitlab-license")
$license = Gitlab::License.import(data)
 
puts "Imported license:"
puts $license
 
unless $license
  raise "The license is invalid."
end
 
if $license.restricted?(:active_user_count)
  active_user_count = 10000
  if active_user_count > $license.restrictions[:active_user_count]
    raise "The active user count exceeds the allowed amount!"
  end
end
 
if $license.notify_admins?
  puts "The license is due to expire on #{$license.expires_at}."
end
 
if $license.notify_users?
  puts "The license is due to expire on #{$license.expires_at}."
end
 
module Gitlab
  class GitAccess
    def check(cmd, changes = nil)
      if $license.block_changes?
        return build_status_object(false, "License expired")
      end
    end
  end
end
 
puts "This instance of GitLab Enterprise Edition is licensed to:"
$license.licensee.each do |key, value|
  puts "#{key}: #{value}"
end
 
if $license.expired?
  puts "The license expired on #{$license.expires_at}"
elsif $license.will_expire?
  puts "The license will expire on #{$license.expires_at}"
else
  puts "The license will never expire."
end
```

```bash
ruby license.rb
```

生成`GitLabBV.gitlab-license` `license_key` `license_key.pub`这三个文件。

## 3. 使用许可证

用`license_key.pub`文件替换`/opt/gitlab/embedded/service/gitlab-rails/.license_encryption_key.pub`。

`GitLabBV.gitlab-license`即是许可证，填入`${address}/admin/license`地址并重启Gitlab。

```bash
gitlab-ctl restart
```

## 4. 修改等级

```diff
--- /opt/gitlab/embedded/service/gitlab-rails/ee/app/models/license.rb
+++ /opt/gitlab/embedded/service/gitlab-rails/ee/app/models/license.rb
@@ -458,7 +458,7 @@
  end
 
  def plan
-    restricted_attr(:plan).presence || STARTER_PLAN
+    restricted_attr(:plan).presence || ULTIMATE_PLAN
  end
 
  def edition
```

## 5. 关闭Gitlab Service Ping（可选）

- 打开配置文件

```bash
sudo nano /etc/gitlab/gitlab.rb
```

- 添加下面这一行代码

```rb
gitlab_rails['usage_ping_enabled'] = false
```

- 重新配置并重启Gitlab

```bash
sudo gitlab-ctl reconfigure
sudo gitlab-ctl restart
```

## 参考

- <https://www.rubydoc.info/gems/gitlab-license/1.0.0/file/README.md>
- <https://github.com/Lakr233/GitLab-License-Generator>

> [!info]
> 现在你已经破解好了Gitlab EE，可以使用其中的高级功能。

---

_2021-07-09 Written By 夜法之书_

_有删改_

_原文：[破解Gitlab EE](https://blog.17lai.site/posts/29a820b3/)_
