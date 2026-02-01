import { NextResponse } from 'next/server';

const {
  STRAVA_CLIENT_ID: client_id,
  STRAVA_CLIENT_SECRET: client_secret,
  STRAVA_REFRESH_TOKEN: refresh_token,
} = process.env;

const TOKEN_ENDPOINT = 'https://www.strava.com/oauth/token';
const ACTIVITIES_ENDPOINT = 'https://www.strava.com/api/v3/athlete/activities';

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      refresh_token,
      grant_type: 'refresh_token',
    }),
  });

  return response.json();
};

export async function GET() {
  if (!refresh_token || !client_id || !client_secret) {
    return NextResponse.json({ valid: false, error: 'Missing environment variables' });
  }

  try {
    const tokenResponse = await getAccessToken();
    
    if (tokenResponse.errors) {
        return NextResponse.json({ valid: false, error: 'Token exchange failed', details: tokenResponse });
    }

    const { access_token } = tokenResponse;

    if (!access_token) {
        return NextResponse.json({ valid: false, error: 'No access token received', details: tokenResponse });
    }

    const response = await fetch(`${ACTIVITIES_ENDPOINT}?per_page=3`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ valid: false, error: `Strava API error: ${response.status}` });
    }

    const activities = await response.json();

    if (!activities || activities.length === 0) {
      return NextResponse.json({ valid: false, error: 'No activities found' });
    }

    const runs = activities.map((activity: { name: string; distance: number; moving_time: number; elapsed_time: number; total_elevation_gain: number; type: string; start_date: string; average_speed: number; max_speed: number; kudos_count: number; map?: { summary_polyline: string }; id: number }) => ({
      name: activity.name,
      distance: activity.distance, // in meters
      moving_time: activity.moving_time, // in seconds
      elapsed_time: activity.elapsed_time,
      total_elevation_gain: activity.total_elevation_gain,
      type: activity.type,
      start_date: activity.start_date,
      average_speed: activity.average_speed,
      max_speed: activity.max_speed,
      kudos_count: activity.kudos_count,
      map_summary_polyline: activity.map?.summary_polyline,
      url: `https://www.strava.com/activities/${activity.id}`,
    }));

    return NextResponse.json({
      valid: true,
      runs,
    });
  } catch (error) {
    console.error('Error fetching Strava data:', error);
    return NextResponse.json({ valid: false, error: 'Internal server error', details: String(error) });
  }
}
