// @flow
import React, { Component } from 'react';
import './App.css';
import { Grid, Button, Panel, DropdownButton, MenuItem, Label, Form, FormControl, FormGroup, InputGroup, Media, Checkbox } from 'react-bootstrap';

const STATION_DATA = [
  {name: "松戸駅", latitude:35.7849593, longitude:139.8983253},
  {name: "北松戸駅", latitude:35.8003695, longitude:139.9134339},
  {name: "馬橋駅", latitude:35.8113443, longitude:139.9150873},
  {name: "新松戸駅", latitude:35.8245533, longitude:139.9211922},
  {name: "北小金駅", latitude:35.8005456, longitude:139.9095732},
  {name: ""},
  {name: "上本郷駅", latitude:35.7885149, longitude:139.9158631},
  {name: "松戸新田駅", latitude:35.79062, longitude:139.922276},
  {name: "みのり台駅", latitude:35.7881568, longitude:139.9286494},
  {name: "八柱駅", latitude:35.7901759, longitude:139.9379298},
  {name: "常盤平駅", latitude:35.8030837, longitude:139.9503831},
  {name: "五香駅", latitude:35.7969461, longitude:139.9668652},
  {name: "元山駅", latitude:35.7898013, longitude:139.9761134},
  {name: ""},
  {name: "矢切駅", latitude:35.756891, longitude:139.9005437},
  {name: "北国分駅", latitude:35.7620618, longitude:139.9140265},
  {name: "秋山駅", latitude:35.765484, longitude:139.93111},
  {name: "東松戸駅", latitude:35.7689836, longitude:139.9432014},
  {name: "松飛台駅", latitude:35.7739715, longitude:139.9577712},
  {name: "大町駅", latitude:35.7733186, longitude:139.9738537},
  {name: ""},
  {name: "六実駅", latitude:35.793705, longitude:139.9971643},
  {name: "幸谷駅", latitude:35.82706, longitude:139.920053},
  {name: "小金城趾駅", latitude:35.835976, longitude:139.916858},
]

// 駅ドロップダウン
class DropdownButtonStation extends Component {

  render(){
    let infoList = 
      this.props.data.map(
        (info, i) => {
          return (
            info.name ?
              <MenuItem key={i} eventKey={i} href="#top"><h4>{info.name}</h4></MenuItem>
               :
              <MenuItem key={i} divider />
          );
        }
      );
      
    return(
      <DropdownButton id="dropDownButtonStation"
        title={this.props.title} bsStyle="success" bsSize="large"
        onSelect={(key) => this.props.onSelect(key)}>
        {infoList} 
      </DropdownButton>
    );
  }
}

// 郵便番号入力
class FormZip extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.onChange(e.target.value);
  }

  render(){
    return(
      <Form inline>
          <FormGroup bsSize="large">
            <InputGroup>
              <FormControl
                type="number"
                value={this.props.value}
                placeholder="郵便番号7桁"
                onChange={this.handleChange}
              />
              <InputGroup.Button>
                <Button bsSize="large" disabled={this.props.buttonDisabled}>{this.props.zipAddress}表示</Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
      </Form>
    );
  }
}

class ImageMedia extends Component {

  render(){
    return(
      <Media.Left align="middle">
          <img width={this.props.width} src={"/monster/" + this.props.file} alt="monster" hidden={!this.props.display}/>
      </Media.Left>
    );
  }
}


class IncidentInfoList extends Component {
  
  getMapUrl(m)
  {
    //const GMAP_KEY = "AIzaSyCCp4cUBvo4_UutOeF-4o0CboW5sqailCg";
    //const GMAP_SIZE = "700x700";
    const GMAP_COODINATE = `${m.latitude},${m.longitude}`;
    const GMAP_URL = `https://maps.google.co.jp/maps?ll=${GMAP_COODINATE}&t=k`;
    return GMAP_URL;
  }

  getMapUrl2(m)
  {
    const GMAP_KEY = "AIzaSyCCp4cUBvo4_UutOeF-4o0CboW5sqailCg";
    const GMAP_SIZE = "700x700";
    const GMAP_COODINATE = `${m.latitude},${m.longitude}`;
    const GMAP_URL = `https://maps.googleapis.com/maps/api/staticmap?&center=${GMAP_COODINATE}&zoom=17&size=${GMAP_SIZE}&sensor=false&key=${GMAP_KEY}&markers=size:normal|${GMAP_COODINATE}`;
    return GMAP_URL;
  }

  getBeeUrl(m)
  {
    return `https://www.sonicweb-asp.jp/matsudo/map?theme=th_41#scale=3750&pos=${m.longitude}%2C${m.latitude}`;
  }

  getImageFile(kbn, point, age, sex)
  {
    if(sex === "女")
    {
      return "kuchisake.png";
    }

    switch(kbn){
      case "交差点事故":
      case "交通事故":
        if (point <= 200)
        {
          return "metalhound01.png";
        }else if (point <= 300){
          return "metalgarm.png";
        }else if (point <= 999){
          return "talos.png";
        }else{
          return "tank-saurus01.png";
        }
      case "ハチ発生":
        if (point < 30)
        {
          return "pixy01.png";
        }else if (point < 50){
          return "pixy03.png";
        }else if (point < 100){
          return "pixy02.png";
        }else if (point < 200){
          return "honey01.png";
        }else if (point < 400){
          return "kamaitachi02.png";
        }else if (point < 700){
          return "camazotz.png";
        }else{
          return "aman2.png";
        }
      default:
        if(point <= 500)
        {
          switch(kbn){
            case "暴行": return "tsann-majin-l.png";
            case "痴漢": return "kurofuku.png";
            case "露出": return "zintaimokei.png";
            case "待ち伏せ": return "clown.png";
            case "建造物侵入": return "the-door-minister-mv.png";
            case "盗撮": 
              if (age <= 40)
              {
                return "cult2012-01.png";
              }
              return "pickman.png";
            case "のぞき": return "boogyman.png";
            case "容姿撮影": return "pastor.png";
            case "声かけ": return "kuroko.png";
            case "つきまとい": return "the-teaparty-minister-mv.png";
            case "不審者": return "the-clock-2nd-mv.png";
            default: return "";
          }
        }else{
          switch(kbn){
            case "暴行": return "behemoth.png";
            case "痴漢": 
              if (age <= 40)
              {
                return "ryoumensukuna.png";
              }
              return "deceitful-faith.png"
            case "露出": return "bafomet-re.png";
            case "待ち伏せ": return "clown-mecha.png";
            case "建造物侵入": return "the-door-mv.png";
            case "盗撮": return "cult2012preast-01.png";
            case "のぞき": return "hookman.png";
            case "容姿撮影": return "animalhead.png";
            case "声かけ": return "bael.png";
            case "つきまとい": return "the-teaparty-hatta-mv.png";
            case "不審者": return "the-teaparty-haigha-mv.png";
            default: return "";
          }
        }
    }
  }

  render(){
    let infoList = this.props.display ? (
      this.props.data.map(
        (info, i) => {
          let imageFile = this.getImageFile(info.kbn, info.point, info.age, info.sex);

          switch(info.kbn){
            case "交差点事故":
              let count = "";
              count += (info.countH26 > 0 ? "2014年" + info.countH26 + "件、" : "");
              count += (info.countH27 > 0 ? "2015年" + info.countH27 + "件、" : "");

              return(
                <Panel key={i}>
                  <Media>
                    <ImageMedia display={this.props.displayImage} file={imageFile} width={117} />
                    <Media.Body>
                    <Media.Heading>{info.routeName + info.crossRoad}交差点で{count}交通事故発生</Media.Heading>
                      【危険度】{info.point}<br />
                      【場所】{info.address} <a href={this.getMapUrl2(info)} target="_blank"><Button bsStyle="primary" bsSize="xsmall">地図</Button></a>
                    </Media.Body>
                  </Media>
                </Panel>
              )
            case "交通事故":
              return(
                <Panel key={i}>
                  <Media>
                    <ImageMedia display={this.props.displayImage} file={imageFile} width={117} />
                    <Media.Body>
                    <Media.Heading>{info.incident}</Media.Heading>
                      【危険度】{info.point}<br />
                      【場所】{info.address} <a href={this.getMapUrl2(info)} target="_blank"><Button bsStyle="primary" bsSize="xsmall">地図</Button></a>
                    </Media.Body>
                  </Media>
                </Panel>
              )
            case "ハチ発生":
              return(
                <Panel key={i}>
                  <Media>
                    <ImageMedia display={this.props.displayImage} file={imageFile} width={117} />
                    <Media.Body>
                    <Media.Heading>スズメバチ駆除件数、2016年は{info.countH28}件</Media.Heading>
                      【危険度】{info.point}<br />
                      【場所】{info.address}<br />
                      <a href={this.getBeeUrl(info)} target="_blank"><Button bsStyle="primary" bsSize="xsmall">【詳細】松戸やさシティマップ</Button></a>
                    </Media.Body>
                  </Media>
                </Panel>
              )
            default:
              return(
                <Panel key={i}>
                  <Media>
                    <ImageMedia display={this.props.displayImage} file={imageFile} width={100} />
                    <Media.Body>
                    <Media.Heading>{info.incident}</Media.Heading> 
                    【危険度】{info.point}<br />
                    【発生日】{info.incidentDate}&nbsp;<a href={this.getMapUrl2(info)} target="_blank"><Button bsStyle="primary" bsSize="xsmall">地図</Button></a><br />
                    【不審者】{info.age}、{info.sex}、{info.tall}、使用車両は{info.car}<br />
                    【特徴】{info.spec}<br />
                    【服装】{info.dress}
                    </Media.Body>
                  </Media>
                </Panel>
              )
          }
      })
    ) : null;

    return(
      <div>{infoList}</div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      opendHelp: false,
      latitude: 0,
      longitude: 0,
      infoTotal: this.getInfoTotal(),
      infoNear: [],
      hasLocation: false,
      stationSelected: "最寄駅を選択して近辺表示",
      warningInfo : "",
      zipCode : "",
      zipCodes: this.getTSVMap("ZipCode.tsv",
        (arr) => arr[0],
        (arr) => {
          return {
            address : arr[1],
            latitude : arr[2],
            longitude : arr[3]
          }
        }
      ),
      zipButtonDisabled : true,
      zipAddress : "",
      displayImage : true,
      dangerInfo : "",
      dangerPoint : 0,

    };
  }

  getInfoTotal()
  {
    let resultJunction = 
      this.getTSV("JunctionInfo.tsv",
        (arr) => {
          return {
            kbn : arr[0],
            cityName : arr[1],
            address: arr[2],
            latitude : arr[3],
            longitude : arr[4],
            routeName: arr[5],
            crossRoad: arr[6],
            countH26: arr[7],
            countH27: arr[8],
            point: arr[9],
            distance: 0
          }
        }
      );

    let resultTraffic = 
      this.getTSV("TrafficInfo.tsv",
        (arr) => {
          return {
            kbn : arr[0],
            address: arr[1],
            latitude : arr[2],
            longitude : arr[3],
            incident : arr[4],
            point: arr[5],
            distance: 0
          }
        }
      );

    let resultHentai = 
      this.getTSV("HentaiInfo.tsv",
        (arr) => {
          return {
            kbn : arr[0],
            incidentDate : arr[1],
            address: arr[2],
            latitude : arr[3],
            longitude : arr[4],
            age: arr[5],
            sex: arr[6],
            tall: arr[7],
            car: arr[8],
            spec: arr[9],
            dress: arr[10],
            incident: arr[11],
            point: arr[12],
            distance: 0
          }
        }
      );
    
    let resultBee =
      this.getTSV("BeeInfo.tsv",
        (arr) => {
          return {
            kbn : arr[0],
            address: arr[1],
            latitude : arr[2],
            longitude : arr[3],
            countH28: arr[4],
            point: arr[5]
          }
        }
      );    

    let result = [];
    result = resultJunction.concat(resultTraffic).concat(resultHentai).concat(resultBee);

    //console.log(result);
    return result;  
  }

  // TSV読み込み
  getTSV(fileName, funcReturn){
    let result = [];
    let req = new XMLHttpRequest();
    req.open("get", fileName, false); // 非同期にしたい・・・
    req.send(null);

    let str = req.responseText;
    str = str.replace( /\r\n/g , "\n" );
    let tmp = str.split("\n");

    for(let i=0;i<tmp.length;++i){
      let arr = tmp[i].split("\t");
      result[i] = funcReturn(arr);
    }
    return result;
  }

  // TSV読み込み、Mapを返す
  getTSVMap(fileName, funcKey, funcValue){
    let result = new Map();
    let req = new XMLHttpRequest();
    req.open("get", fileName, false); // 非同期にしたい・・・
    req.send(null);

    let str = req.responseText;
    str = str.replace( /\r\n/g , "\n" );
    let tmp = str.split("\n");

    for(let i=0;i<tmp.length;++i){
      let arr = tmp[i].split("\t");
      result.set(funcKey(arr), funcValue(arr));
    }

    return result;
  }

  // 距離計算関数
  getDistance(myCoords, targetCoords){
    const lat1 = myCoords.latitude;
    const lng1 = myCoords.longitude;
    const lat2 = targetCoords.latitude;
    const lng2 = targetCoords.longitude;

    function radians(deg){
      return deg * Math.PI / 180;
    }

    return 6378.14 * Math.acos(Math.cos(radians(lat1))* 
      Math.cos(radians(lat2))*
      Math.cos(radians(lng2)-radians(lng1))+
      Math.sin(radians(lat1))*
      Math.sin(radians(lat2)));
  }

  // 距離計算し、サービス情報を距離が近い順にソート
  adjustIncidentInfo(myCoords)
  {
    let ar = this.state.infoTotal.slice();
    let nearAr = [];
    let sumPoint = 0;

    // 距離計算し、距離が近い順にソート
    for(let i = 0; i < ar.length; i++) {
      ar[i].distance = this.getDistance(myCoords, ar[i])
      // 危険ポイントを集計
      if(ar[i].distance <= 1)
      {
        sumPoint += parseInt(ar[i].point, 10);
        nearAr.push(ar[i]);
      }
    }

    nearAr.sort((a, b) => {
      if(a.distance < b.distance) return -1;
      if(a.distance > b.distance) return 1;
      return 0;
    });

    this.setState({
      latitude: myCoords.latitude,
      longitude: myCoords.longitude,
      hasLocation: true,
      warningInfo : "",
      infoNear: nearAr.slice(),
      dangerPoint : sumPoint,
      dangerInfo : "選択した場所の危険度は" + sumPoint.toLocaleString() + "です！",
    });
  }

  // 位置情報取得して一覧表示
  _onClickCurrent(){
    const options = {
      enableHighAccuracy: true,
      maximumAge: 1,
      timeout: 10000,
    };

    let success = (position) => {
      this.clearStation();
      this.clearZipCode();
      this.adjustIncidentInfo(position.coords);
    }

    let error = (err) => {
      this.setState({
        latitude: 0,
        longitude: 0,
        warningInfo : "現在位置の取得に失敗しました。",
        hasLocation: false,   
      })
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  // 駅を指定して一覧表示
  _onSelectStation(key)
  {
    this.setState({
      stationSelected : STATION_DATA[key].name + "の近辺表示",
    });

    this.clearZipCode();

    //console.log("select:"+key);
    this.adjustIncidentInfo(STATION_DATA[key]);
  }

  clearStation()
  {
    this.setState({
      stationSelected : "最寄駅を選択して近辺表示",
    });
  }

  // 郵便番号から一覧表示
  _onChangeZipCode(key)
  {
    let buttonEnabled = false;
    let address = "";

    if (key.length === 7 && this.state.zipCodes.has(key))
    {
      //console.log("zipCodes", this.state.zipCodes);
      buttonEnabled = true;
      let zipArea = this.state.zipCodes.get(key);
      address = "【" + zipArea.address + "】";

      this.clearStation();
      this.adjustIncidentInfo(zipArea); 
    }

    this.setState({
      zipCode : key,
      zipAddress: address,
      zipButtonDisabled: !buttonEnabled
    });
  }

  clearZipCode()
  {
    this.setState({
      zipCode : "",
      zipAddress: "",
      zipButtonDisabled: true
    });
  }


  render() {
    return (
      <div>
          <Grid>
            <div className="page-header">
              <h3>デンジャラス松戸（仮）</h3>
            </div>
            <Button bsStyle="info" onClick={()=> this.setState({ opendHelp: !this.state.opendHelp })}>
              {this.state.opendHelp ? "▲" : "▼"}サイトの説明
            </Button>
            <Panel collapsible expanded={this.state.opendHelp}>
              <ul>
                <li>当サイトは千葉県警のデータ（<a href="http://www.police.pref.chiba.jp/kotsusomuka/traffic-safety_trouble.html" target="_blank">交通事故多発ランキング</a>、
                <a href="http://www.police.pref.chiba.jp/kojyoka/safe-life_gis.html" target="_blank">子供や女性が被害者となった事件の検挙情報</a>）を見える化したものです。</li>
                <li>選択した場所から半径約1km以内の危険情報が一覧表示されます。危険度の高さや属性に応じて、モンスターが表示されます。</li>
                <li>一覧表示されたモンスターに応じて、あなたの選択した場所の危険度が算出されます。</li>
                <li>モンスターグラフィックの著作権は<a href="http://cyanyurikago.web.fc2.com/index.html" target="_blank">マゼランさん</a>に帰属します。</li>
              </ul>
            </Panel>
            <DropdownButtonStation
              title={this.state.stationSelected}
              data={STATION_DATA}
              onSelect={(key) => this._onSelectStation(key) } />
            <p />
            <Button
              id="buttonGetLocation"
              bsStyle="primary"
              bsSize="large"
              onClick={() => this._onClickCurrent()}>
              現在位置を取得して近辺表示
            </Button>
            <p />
            <FormZip
              value={this.state.zipCode}
              buttonDisabled={this.state.zipButtonDisabled}
              zipAddress={this.state.zipAddress}
              onChange={(value) => this._onChangeZipCode(value) }
             />
            <Checkbox
              id="displayImage"
              checked={this.state.displayImage}
              onChange={()=> this.setState({ displayImage: !this.state.displayImage })} >
              怖いモンスター画像を表示します
            </Checkbox>

            <h4>
              <Label bsStyle="danger">
                {this.state.warningInfo}
              </Label>
            </h4>
            <h4>
              <big>
              <Label bsStyle="danger">
                {this.state.dangerInfo}
              </Label>
              </big>
            </h4>
            <IncidentInfoList
              data={this.state.infoNear}
              display={this.state.hasLocation}
              displayImage={this.state.displayImage} />
          </Grid>
      </div>
    );
  }
}

export default App;