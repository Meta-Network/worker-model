/* eslint-disable @typescript-eslint/no-namespace */
export namespace MetaWorker {
  export namespace Enums {
    export enum TemplateType {
      HEXO = 'HEXO',
    }

    enum GitServiceEnum {
      GITHUB = 'GITHUB',
      GITEE = 'GITEE',
    }
    export type GitServiceType = GitServiceEnum;
    export const GitServiceType = GitServiceEnum;

    enum DataProcessEnum {}
    export type DataProcessType = TemplateType | DataProcessEnum;
    export const DataProcessType = { ...TemplateType, ...DataProcessEnum };

    enum StorageEnum {}
    export type StorageType = GitServiceEnum | StorageEnum;
    export const StorageType = { ...GitServiceEnum, ...StorageEnum };

    enum CICDEnum {
      GITLAB = 'GITLAB',
      JENKINS = 'JENKINS',
      AZDO = 'AZDO', // Azure DevOps
      CIRCLE = 'CIRCLE',
    }
    export type CICDType = GitServiceEnum | CICDEnum;
    export const CICDType = { ...GitServiceEnum, ...CICDEnum };

    enum PublisherEnum {
      GITLAB = 'GITLAB',
      CLOUDFLARE = 'CLOUDFLARE',
      VERCEL = 'VERCEL',
    }
    export type PublisherType = GitServiceEnum | PublisherEnum;
    export const PublisherType = { ...GitServiceEnum, ...PublisherEnum };

    enum CDNEnum {
      CLOUDFLARE = 'CLOUDFLARE',
    }
    export type CDNType = CDNEnum;
    export const CDNType = { ...CDNEnum };

    enum GitTaskMethod {
      /**
       * Create new repo from template archive zip file
       *
       * 1. Git init
       * 2. Download zip archive and decompress
       * 3. Copy template files to repo
       * 4. Git commit and push
       *
       * Original name: CREATE_REPO_FROM_TEMPLATE
       */
      GIT_INIT_PUSH = 'GIT_INIT_PUSH',
      /**
       * Update exist repo use template files
       *
       * 1. Git clone and checkout
       * 2. Download zip archive and decompress
       * 3. Copy template files to repo
       * 4. Git commit and push
       *
       * Original name: UPDATE_REPO_USE_TEMPLATE
       */
      GIT_OVERWRITE_PUSH = 'GIT_OVERWRITE_PUSH',
      /**
       * Chekout repo from remote url, same as `actions/checkout`
       */
      GIT_CLONE_CHECKOUT = 'GIT_CLONE_CHECKOUT',
      /**
       * Commit files and push to remote
       *
       * 1. Git add
       * 2. Git commit
       * 3. Git push
       */
      GIT_COMMIT_PUSH = 'GIT_COMMIT_PUSH',
    }
    enum HexoTaskMethod {
      /**
       * Update Hexo config files from task config,
       * include Hexo config and theme config
       *
       * Original name: UPDATE_HEXO_CONFIG_FILES
       */
      HEXO_UPDATE_CONFIG = 'HEXO_UPDATE_CONFIG',
      /**
       * Generate Hexo static files, aka `$ hexo generate`
       *
       * Original name: GENERATE_HEXO_STATIC_FILES
       */
      HEXO_GENERATE_DEPLOY = 'HEXO_GENERATE_DEPLOY',
      /**
       * Create Hexo post, aka `$ hexo new`
       *
       * Original name: CREATE_HEXO_POST_FILES
       */
      HEXO_CREATE_POST = 'HEXO_CREATE_POST',
    }
    export type TaskMethod = GitTaskMethod | HexoTaskMethod;
    export const TaskMethod = { ...GitTaskMethod, ...HexoTaskMethod };

    export enum TaskReportReason {
      STARTED = 'STARTED',
      FINISHED = 'FINISHED',
      ERRORED = 'ERRORED',
      HEALTH_CHECK = 'HEALTH_CHECK',
    }
  }

  export namespace Info {
    export type UCenterUser = {
      username: string;
      nickname?: string;
    };

    export type CmsSiteInfo = {
      title: string;
      subtitle?: string;
      description?: string;
      author?: string;
      keywords?: string[] | null;
      favicon?: string | null;
    };

    export type CmsSiteConfig = {
      configId: number;
      language?: string;
      timezone?: string;
      domain?: string;
    };

    export type Template = {
      templateName: string;
      templateRepoUrl: string;
      templateBranchName: string;
      templateType?: Enums.TemplateType;
    };

    export type Theme = {
      themeName: string;
      themeRepo: string;
      themeBranch: string;
      themeType?: Enums.TemplateType;
      isPackage?: boolean;
    };

    export type Git = {
      gitToken: string;
      gitType: Enums.GitServiceType;
      gitUsername: string;
      gitReponame: string;
      gitBranchName: string;
      gitLastCommitHash?: string | null;
    };

    export type Task = {
      taskId: string;
      taskMethod: Enums.TaskMethod;
      taskWorkspace: string;
      createAt?: number;
      startAt?: number;
      updateAt?: number;
      finishAt?: number;
      errorAt?: number;
    };

    export type TaskReport = {
      reason: Enums.TaskReportReason;
      timestamp: number;
      data?: unknown;
    };
  }

  export namespace Configs {
    /**
     * All about deploy needed configs
     */
    export type DeployConfig = Info.UCenterUser &
      Info.CmsSiteInfo &
      Info.CmsSiteConfig &
      Info.Template &
      Info.Theme &
      Info.Git;
    export type DeployTaskConfig = Info.Task & DeployConfig;

    /**
     * All about publish needed configs
     * e.g. site title, domain, git info
     */
    export type PublishConfig = Info.CmsSiteInfo &
      Info.CmsSiteConfig &
      Info.Git;
    export type PublishTaskConfig = Info.Task & PublishConfig;
  }
}
