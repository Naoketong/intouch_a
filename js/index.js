const PAGE = {
  data: {
    fetch: {
      date: "2019-04-12 01:16:03",
      quota: 3,
      quota_full: 300,
      term: 2
    },
    page: 1,
  },
  init: function() {
    this.bind();
    this.getData();
  },
  bind: function() {
    $('#nextPage').bind('click',this.handleNextPage);
    $('#prePage').bind('click',this.handlePrePage);
  },
  handleNextPage: function(){
    let page = PAGE.data.page + 1;
    PAGE.goIndex(page);
  },
  handlePrePage: function() {
    let page = PAGE.data.page - 1;
    PAGE.goIndex(page);
  },
  goIndex: function(page) {
    let catalogueListContainer =  $('.catalogue-list-container');
    let lenght = catalogueListContainer.length;

    if(page > lenght){
      page = lenght
    }

    if(page < 1){
      page = 1;
    }

    catalogueListContainer.hide();
    catalogueListContainer.eq(page - 1).show();
    PAGE.data.page = page;

    $('#nextPage').show();
    $('#prePage').show();
    if(page == lenght){
      $('#nextPage').hide();
    }

    if(page == 1){
      $('#prePage').hide();
    }
    
  },
  getData: function() {
    let URL = 'https://www.easy-mock.com/mock/5c95f367addf99613b52960b/intouch/data?jsonp_param_name=callback';
    $.ajax({
      type: 'GET',
      url: URL,
      dataType: "jsonp",
      success: ( res )=>{
        if(res.code === 200){
          this.setData(res.data)
        }else{
          this.setData(PAGE.data.fetch)
        }
      },
      error: (err) => {
        this.setData(PAGE.data.fetch)
      }
    })
  },
  setData: function(data) {
    let quota = data.quota;
    let quota_full = data.quota_full;
    let term = data.term;
    let date = new Date(data.date);
    let dateTimeStamp = date.getTime();
    let dateNow = new Date();
    let dateNowTimeStamp = dateNow.getTime();
    let dateNowMonth = dateNow.getMonth() + 1;
    if(dateNowTimeStamp > dateTimeStamp){
      date = new Date(`2019-${dateNowMonth + 1}-15`);
      dateTimeStamp = date.getTime();
    }
    let dateMonth = date.getMonth() + 1;
    let dateDay = date.getDate();
    let countDownTimeStamp = Math.floor((dateTimeStamp - dateNowTimeStamp)/1000);
    let countDownDay = Math.floor(countDownTimeStamp/(86400));
    let countDownHour = Math.floor((countDownTimeStamp - countDownDay * 86400)/3600);
    let countDownMin = Math.floor((countDownTimeStamp - countDownDay * 86400 - countDownHour * 3600)/60);
    $('.term').text(term);
    $('.quota').text(quota);
    $('.quota_full').text(quota_full);
    $('.date-month').text(dateMonth);
    $('.date-day').text(dateDay);
    $('.countDownDay').text(countDownDay);
    $('.countDownHour').text(countDownHour);
    $('.countDownMin').text(countDownMin);
  }
}

PAGE.init();