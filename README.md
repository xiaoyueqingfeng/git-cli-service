git-cli-service
============

Git cli service with functions of merging branch automatically, creating branch and so on.

## Install
`npm install git-cli-service -g`

## Example

```linux
git-cli-service
```
## Functions
Currently git-cli-service supports create new branch, merge branch, and delete branch.\
While you run git-cli-service, you will see a choice list like this:

  What do you want?
  1) create new branch
  2) merge branch
  3) delete branch

Let's have a quick look!
```js
git-cli-service
? What do you want? mergeBranch
? Please select branch source: v3.4.0
{ branchSource: 'v3.4.0' }
? Please select the branches you want to ignore: origin/feat_updateVant_09xx, origin/fix_compone
nts_0715
ignore branches [ 'feat_updateVant_09xx', 'fix_components_0715' ]
Branch source: v3.4.0

Remote branch list:
 origin/master
origin/feat_component_09xx
origin/feat_discount_10xx
origin/feat_updateVant_09xx
origin/fix_components_0715
origin/master
Local branch list:
 TEMP_BRANCH
feat_ci_0917
feat_ci_0918
feat_cli_0930
feat_component_09xx
feat_discount_10xx
feat_sendCoupon_0917
feat_updateVant_09xx
fix_components_0715
master
Switched to a new branch 'TEMP_BRANCH'
Switched to a new branch 'master'
q [ 'master',
  'TEMP_BRANCH',
  'feat_updateVant_09xx',
  'fix_components_0715' ]
Start deal branch feat_component_09xx
Switched to branch 'feat_component_09xx'
Successfully pulled branch feat_component_09xx!
Successfully merged v3.4.0 into feat_component_09xx!
Everything up-to-date
Everything up-to-date
Successfully pushed branch feat_component_09xx to origin!

Start deal branch feat_discount_10xx
Switched to branch 'feat_discount_10xx'
Successfully pulled branch feat_discount_10xx!
Successfully merged v3.4.0 into feat_discount_10xx!
Everything up-to-date
Everything up-to-date
Successfully pushed branch feat_discount_10xx to origin!

teng@tengdeMacBook-Pro mina (feat_discount_10xx) $ fe
teng@tengdeMacBook-Pro fe $ cd saas
teng@tengdeMacBook-Pro saas (master) $ git-cli-service
? What do you want? mergeBranch
From gitlab.styd.cn:fe/saas/web
   403798a2b..8f6a782ad  feat_useBussiness -> origin/feat_useBussiness
From gitlab.styd.cn:fe/saas/web
 t [tag update]          v2.2.0     -> v2.2.0
 * [new tag]             v2.27.1    -> v2.27.1
 * [new tag]             v2.27.2    -> v2.27.2
? Please select branch source: origin/master
{ branchSource: 'origin/master' }
? Please select the branches you want do ignore: origin/feat_childSystem_0924, origin/feat_onlin
e_course_0227
ignore branches [ 'feat_childSystem_0924', 'feat_online_course_0227' ]
Branch source: origin/master

Remote branch list:
 origin/feat_childSystem_0924
origin/feat_courseEvaluation_10XX
origin/feat_discount_10xx
origin/feat_importOptimize_0925
origin/feat_online_course_0227
origin/feat_updateAnt_09xx
origin/feat_useBussiness
origin/feat_versionSplitting_0930
origin/master
Local branch list:
feat_branch
feat_childSystem_0924
feat_menu_0930
feat_versionSplitting_0930
master
Switched to a new branch 'TEMP_BRANCH'
Switched to a new branch 'feat_courseEvaluation_10XX'
Switched to a new branch 'feat_discount_10xx'
Switched to a new branch 'feat_importOptimize_0925'
Switched to a new branch 'feat_online_course_0227'
Switched to a new branch 'feat_updateAnt_09xx'
Switched to a new branch 'feat_useBussiness'
Switched to a new branch 'master'
q [ 'master',
  'TEMP_BRANCH',
  'feat_childSystem_0924',
  'feat_online_course_0227' ]
Start deal branch feat_versionSplitting_0930
Switched to branch 'feat_versionSplitting_0930'
Successfully pulled branch feat_versionSplitting_0930!
husky > commit-msg (node v11.15.0)
Successfully merged origin/master into feat_versionSplitting_0930!
remote:
remote: To create a merge request for feat_versionSplitting_0930, visit:
remote:   https://gitlab.styd.cn/fe/saas/web/merge_requests/new?merge_request%5Bsource_branch%5D=feat_versionSplitting_0930
remote:
To gitlab.styd.cn:fe/saas/web.git
   37750c088..8a0e2b34b  feat_versionSplitting_0930 -> feat_versionSplitting_0930
Everything up-to-date
Successfully pushed branch feat_versionSplitting_0930 to origin!

Start deal branch feat_courseEvaluation_10XX
Switched to branch 'feat_courseEvaluation_10XX'
Successfully pulled branch feat_courseEvaluation_10XX!
husky > commit-msg (node v11.15.0)
Successfully merged origin/master into feat_courseEvaluation_10XX!
remote:
remote: To create a merge request for feat_courseEvaluation_10XX, visit:
remote:   https://gitlab.styd.cn/fe/saas/web/merge_requests/new?merge_request%5Bsource_branch%5D=feat_courseEvaluation_10XX
remote:
To gitlab.styd.cn:fe/saas/web.git
   5ec47d872..2ec976b63  feat_courseEvaluation_10XX -> feat_courseEvaluation_10XX
Everything up-to-date
Successfully pushed branch feat_courseEvaluation_10XX to origin!

Start deal branch feat_discount_10xx
Switched to branch 'feat_discount_10xx'
Successfully pulled branch feat_discount_10xx!
husky > commit-msg (node v11.15.0)
Successfully merged origin/master into feat_discount_10xx!
remote:
remote: To create a merge request for feat_discount_10xx, visit:
remote:   https://gitlab.styd.cn/fe/saas/web/merge_requests/new?merge_request%5Bsource_branch%5D=feat_discount_10xx
remote:
To gitlab.styd.cn:fe/saas/web.git
   07b88207a..32c16ec94  feat_discount_10xx -> feat_discount_10xx
Everything up-to-date
Successfully pushed branch feat_discount_10xx to origin!

Start deal branch feat_importOptimize_0925
Switched to branch 'feat_importOptimize_0925'
Successfully pulled branch feat_importOptimize_0925!
husky > commit-msg (node v11.15.0)
Successfully merged origin/master into feat_importOptimize_0925!
remote:
remote: To create a merge request for feat_importOptimize_0925, visit:
remote:   https://gitlab.styd.cn/fe/saas/web/merge_requests/new?merge_request%5Bsource_branch%5D=feat_importOptimize_0925
remote:
To gitlab.styd.cn:fe/saas/web.git
   c012888cc..63ac1a9d7  feat_importOptimize_0925 -> feat_importOptimize_0925
Everything up-to-date
Successfully pushed branch feat_importOptimize_0925 to origin!

Start deal branch feat_updateAnt_09xx
Switched to branch 'feat_updateAnt_09xx'
Successfully pulled branch feat_updateAnt_09xx!
husky > commit-msg (node v11.15.0)
Successfully merged origin/master into feat_updateAnt_09xx!
remote:
remote: To create a merge request for feat_updateAnt_09xx, visit:
remote:   https://gitlab.styd.cn/fe/saas/web/merge_requests/new?merge_request%5Bsource_branch%5D=feat_updateAnt_09xx
remote:
To gitlab.styd.cn:fe/saas/web.git
   85841dba8..5b930f90e  feat_updateAnt_09xx -> feat_updateAnt_09xx
Everything up-to-date
Successfully pushed branch feat_updateAnt_09xx to origin!

Start deal branch feat_useBussiness
Switched to branch 'feat_useBussiness'
Successfully pulled branch feat_useBussiness!
husky > commit-msg (node v11.15.0)
Successfully merged origin/master into feat_useBussiness!
remote:
remote: To create a merge request for feat_useBussiness, visit:
remote:   https://gitlab.styd.cn/fe/saas/web/merge_requests/new?merge_request%5Bsource_branch%5D=feat_useBussiness
remote:
To gitlab.styd.cn:fe/saas/web.git
   8f6a782ad..94dfe1530  feat_useBussiness -> feat_useBussiness
Everything up-to-date
Successfully pushed branch feat_useBussiness to origin!
```
