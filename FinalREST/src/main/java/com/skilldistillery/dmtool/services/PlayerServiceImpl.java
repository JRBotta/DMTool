package com.skilldistillery.dmtool.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.dmtool.entities.Player;
import com.skilldistillery.dmtool.repositories.CampaignRepository;
import com.skilldistillery.dmtool.repositories.PlayerRepository;
@Service
public class PlayerServiceImpl implements PlayerService {
	
	@Autowired
	private PlayerRepository playerRepo;
	@Autowired
	private CampaignRepository campRepo;

	@Override
	public Set<Player> index(int cid) {
		return (Set<Player>) playerRepo.findByCampaign_Id(cid);
	}

	@Override
	public Player show(int pid) {
		return playerRepo.findById(pid).get();
	}

	@Override
	public Player create(int cid, Player player) {
		player.setCampaign(campRepo.findOneById(cid));
		return playerRepo.saveAndFlush(player);
	}

	@Override
	public Player update(int pid, Player player) {
		player.setId(pid);
		return playerRepo.saveAndFlush(player);
	}

	@Override
	public void destroy(int pid) {
		playerRepo.deleteById(pid);
	}

}
