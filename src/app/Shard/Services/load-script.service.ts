import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'Emergency', src: 'assets/js/Emergency.js' }
];
declare var document: any;

@Injectable({
  providedIn: 'root'
})
export class LoadScriptService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      debugger
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {  //IE
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    this.scripts[name].loaded = true;
                    resolve({script: name, loaded: true, status: 'Loaded'});
                }
            };
        } else {  //Others
            script.onload = () => {
                this.scripts[name].loaded = true;
                resolve({script: name, loaded: true, status: 'Loaded'});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        debugger;
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

   loadScripts( ) {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.load('Emergency').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }

  loadStyle(styleName: string ,theme :string ) {
    const head = document.getElementsByTagName('head')[0];
    //'Arabic-theme'
    let themeLink = document.getElementById(
      `${theme}`
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = document.createElement('link');
      style.id =`${theme}`;
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      head.appendChild(style);
     
    }
  }

  RemoveScript(){
    this.scripts['Emergency'].loaded = false;
   
    let head = document.getElementsByTagName('head')[0];
    let scripts = head.getElementsByTagName('script');
    if(scripts.length > 0)
         head.removeChild(scripts[0]);

  }
}
