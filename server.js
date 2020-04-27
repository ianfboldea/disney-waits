const express = require('express');
const colors = require('colors');
const Themeparks = require('themeparks');
const parks = {
  disneyworld: {
    magic: new Themeparks.Parks.WaltDisneyWorldMagicKingdom(),
    epcot: new Themeparks.Parks.WaltDisneyWorldEpcot(),
    hollywood: new Themeparks.Parks.WaltDisneyWorldHollywoodStudios(),
    animal: new Themeparks.Parks.WaltDisneyWorldAnimalKingdom(),
  },
  disneyland: {
    magic: new Themeparks.Parks.DisneylandResortMagicKingdom(),
    californiaadventure: new Themeparks.Parks.DisneylandResortCaliforniaAdventure(),
  },
  disneylandparis: {
    magic: new Themeparks.Parks.DisneylandParisMagicKingdom(),
    waltdisneystudios: new Themeparks.Parks.DisneylandParisWaltDisneyStudios(),
  },
  disneylandhongkong: {
    hongkong: new Themeparks.Parks.HongKongDisneyland(),
  },
  disneyshanghai: {
    magic: new Themeparks.Parks.ShanghaiDisneyResortMagicKingdom(),
  },
  disneytokyo: {
    magic: new Themeparks.Parks.TokyoDisneyResortMagicKingdom(),
    disneysea: new Themeparks.Parks.TokyoDisneyResortDisneySea(),
  },
};

const app = express();

// @route    GET api/v1/waits
// @desc     Gets wait time information for a given park
// @access   Public
app.get('/api/v1/waits/:resort/:park', async (req, res) => {
  const { resort, park } = req.params;
  const rideTimes = await parks[resort][park].GetWaitTimes();
  res.json({ rideTimes });
});

// @route    GET api/v1/parks
// @desc     Gets park information
// @access   Public
app.get('/api/v1/:resort/parks', async (req, res) => {
  const parkInfo = {};
  const keys = Object.keys(parks[req.params.resort]);
  keys.forEach((key) => {
    const {
      Name,
      Timezone,
      LocationString,
      SupportsWaitTimes,
      SupportsOpeningTimes,
      SupportsRideSchedules,
      FastPass,
      FastPassReturnTimes,
      Now,
      UserAgent,
    } = parks[req.params.resort][key];
    parkInfo[key] = {
      Name,
      Timezone,
      LocationString,
      SupportsWaitTimes,
      SupportsOpeningTimes,
      SupportsRideSchedules,
      FastPass,
      FastPassReturnTimes,
      Now,
      UserAgent,
    };
  });
  res.json({ parkInfo });
});

const PORT = 5000;

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`.bold.yellow)
);
