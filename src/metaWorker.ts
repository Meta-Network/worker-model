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
       */
      CREATE_REPO_FROM_TEMPLATE = 'CREATE_REPO_FROM_TEMPLATE',
      /**
       * Update exist repo use template files
       *
       * 1. Git clone and checkout
       * 2. Download zip archive and decompress
       * 3. Copy template files to repo
       * 4. Git commit and push
       */
      UPDATE_REPO_USE_TEMPLATE = 'UPDATE_REPO_USE_TEMPLATE',
      /**
       * Chekout repo from remote url, same as `actions/checkout`
       */
      CHECKOUT_REPO_FROM_REMOTE = 'CHECKOUT_REPO_FROM_REMOTE',
    }
    enum HexoTaskMethod {
      /**
       * Update Hexo config files from task config,
       * include Hexo config and theme config
       */
      UPDATE_HEXO_CONFIG_FILES = 'UPDATE_HEXO_CONFIG_FILES',
      /**
       * Generate Hexo static files, aka `$ hexo generate`
       */
      GENERATE_HEXO_STATIC_FILES = 'GENERATE_HEXO_STATIC_FILES',
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
      themeName: string;
      templateType?: Enums.TemplateType;
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
    export type GitHubWorkerConfig = Info.UCenterUser &
      Info.CmsSiteInfo &
      Info.CmsSiteConfig &
      Info.Template &
      Info.Git;

    export type GitHubWorkerTaskConfig = Info.Task & GitHubWorkerConfig;

    export type GitWorkerConfig = GitHubWorkerConfig;
    export type GitWorkerTaskConfig = GitHubWorkerTaskConfig;
  }
}
