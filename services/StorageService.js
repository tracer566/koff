class storageService {
  constructor(key) {
    this.key = key;
  };

  get() {
    const value = localStorage.getItem(this.key);

    if (value) {
      return value;
    } else {
      return null;
    }
  };

  set(data) {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    };
    localStorage.setItem(this.key, data)

  }

  delete() {
    localStorage.removeItem(this.key);
  }
};

export class favoriteService extends storageService {
  static instance;
  constructor(key = 'favorite') {
    if (!favoriteService.instance) {
      super(key);
      this.favorite = new Set(this.get());
      favoriteService.instance = this;
    };

    return favoriteService.instance;

  };

  get() {
    // super это storageService
    const data = super.get()

    if (data) {
      const favorite = JSON.parse(data);
      // проверка на массив
      if (Array.isArray(favorite)) {
        return favorite;
      };
    };

    return [];
  };

  add(value) {
    this.favorite.add(value);
    this.set([...this.favorite]);
  };

  remove(value) {
    if (this.check(value)) {
      this.favorite.delete(value);
      this.set([...this.favorite]);
      return true;
    };

    return false;
  }

  check(value) {
    return this.favorite.has(value);
  }

};

export class accessKeyService extends storageService {
  static instance;
  constructor(key = 'accessKey') {
    if (!accessKeyService.instance) {
      super(key);
      accessKeyService.instance = this;
    };

    return accessKeyService.instance;

  };

};